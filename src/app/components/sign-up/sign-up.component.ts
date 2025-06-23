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
  newUser: User = new User('','','',)
  
  constructor(private router: Router, private userService: UserService) { }

  signUp(){
    // Basic validation
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password) {
      alert('Please fill in all fields.');
      return;
    }

    // backend API call can be made here to register the user
    this.userService.registerUser(this.newUser).subscribe(() => {
      window.alert("You have successfully registered");
      this.router.navigate(['/login']);}, 
    error => {
      window.alert("failed to Register User");
    })
    // Reset form fields after submission


  }

  goToLogin() {
    this.router.navigate(['/login']);
  }



}
