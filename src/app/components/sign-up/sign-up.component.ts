import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  userService: any;


  constructor(private router: Router, userService: UserService) { }

  newUser: User = new User('','','');

  
  signUp() {
    // Basic validation
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password) {
      alert('Please fill in all fields.');
      return;
    }

    // backend API call can be made here to register the user

    this.userService.registerUser(this.newUser).subscribe(() => {
      window.alert("You have successfully registered");
      this.router.navigate(['/login']);
    })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
