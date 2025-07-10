import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  username: string = '';
  email: string = '';
  password: string = '';


  constructor(private router: Router) { }

  signUp() {
    // Basic validation
    if (!this.username || !this.email || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    // backend API call can be made here to register the user

    // Reset form fields after submission
    this.username = '';
    this.email = '';
    this.password = '';

  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

}
