import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  email: string = ''; // Added email field for the login form

  constructor(private userService: UserService, private router: Router) { }


  onSubmit() {
    this.login();
  }



  login() {

    if (!this.username || !this.password || !this.email) {
      alert('Please fill in all fields.');
      return;
    }



    // Call the user service to log in
    this.userService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('Login successful:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Handle login error
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
