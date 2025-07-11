import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = new User('', '', '', 0);
  editing: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    const storedId = this.authService.GetUserId();
    if (storedId) {
      const userId = storedId;
      this.loadProfile(userId);
    } else {
      console.error('No user ID found in localStorage.');
    }
  }

  loadProfile(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data; // assumes API returns { id, username, email, password }
        console.log(this.user);
        console.log(data);
      },
      error: (err) => console.error('Error loading profile:', err),
    });
  }

  enableEdit() {
    this.editing = true;
  }

  saveProfile() {
    if (!this.user.userId) {
      console.error('No user ID.');
      return;
    }

    this.userService.updateUserProfile(this.user.userId, this.user).subscribe({
      next: () => {
        this.editing = false;
      },
      error: (err) => console.error('Error updating profile:', err),
    });
  }

  deleteProfile() {
    if (!this.user.userId) {
      console.error('No user ID.');
      return;
    }

    this.userService.deleteUserAccount(this.user.userId).subscribe({
      next: () => {
        localStorage.removeItem('userId');
        this.user = new User('', '', '', 0);
        this.editing = true;
      },
      error: (err) => console.error('Error deleting account:', err),
    });
  }

  goToCalendar() {
    this.router.navigate(['/calendar']);
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  cancelEdit() {
    this.editing = false;
  }

  //probably need to fix this function
  //just wanted to get the button on the page
  logout() {
    localStorage.removeItem('authToken');
    this.user = new User('', '', '', 0);
    this.router.navigate(['/login']);
  }
}
