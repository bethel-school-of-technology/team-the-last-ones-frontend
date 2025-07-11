import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {



  constructor(private router: Router, private authService: AuthorizationService) { }

  newUser: User = new User("", "", "", 0);

  ngOnInit(): void {}
  
  signUp() {
    // Basic validation
    if (!this.newUser.userName || !this.newUser.email || !this.newUser.password) {
      alert('Please fill in all fields.');
      return;
    }

    // backend API call can be made here to register the user

    this.authService.registerUser(this.newUser).subscribe({ next: (response) =>{
      window.alert("You have successfully registered");
      this.router.navigate(['/login']);
    }, error: (error) => {
      console.error('failed to register:', error);
      alert('failed to register account');

    }
  })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }


  goToRecipes() {
    this.router.navigate(['/recipes']);
  }
}
