import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User('', '', '', '');
  editing: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      const userId = parseInt(storedId, 10);
      this.loadProfile(userId);
    } else {
      console.error('No user ID found in localStorage.');
    }
  }

  loadProfile(userId: number) {
    this.userService.getUserProfile(userId).subscribe({
      next: (data) => {
        this.user = data; // assumes API returns { id, username, email, password }
      },
      error: (err) => console.error('Error loading profile:', err)
    });
  }

  enableEdit() {
    this.editing = true;
  }

  saveProfile() {
    if (!this.user.id) {
      console.error('No user ID.');
      return;
    }

    this.userService.updateUserProfile(this.user.id, this.user).subscribe({
      next: () => {
        this.editing = false;
      },
      error: (err) => console.error('Error updating profile:', err)
    });
  }

  deleteProfile() {
    if (!this.user.id) {
      console.error('No user ID.');
      return;
    }

    this.userService.deleteUserAccount(this.user.id).subscribe({
      next: () => {
        localStorage.removeItem('userId');
        this.user = new User('', '', '', '');
        this.editing = true;
      },
      error: (err) => console.error('Error deleting account:', err)
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
    this.user = new User('', '', '', '');
    this.router.navigate(['/login']);
  }
}
