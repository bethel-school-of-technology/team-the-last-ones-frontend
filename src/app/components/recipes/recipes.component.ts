import { Component } from '@angular/core';
import { MealDbService } from 'src/app/services/mealdbservice.service';
import { Meal } from 'src/app/models/meal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipeComponent {
  searchQuery = '';
  meals: Meal[] = [];
  errorMessage = '';

  constructor(private mealService: MealDbService, private router: Router) { }

  onSearch() {
    if (this.searchQuery.trim() !== '') {
      this.mealService.GetMealByName(this.searchQuery).subscribe({
        next: (data) => {
          if (data) {
            this.meals = data;
            this.errorMessage = '';
          } else {
            this.meals = [];
            this.errorMessage = 'No recipes found.';
          }
        },
        error: () => {
          this.errorMessage = 'Error fetching recipes.';
        }
      });
    }
  }

  goToCalendar() {
    this.router.navigate(['/calendar']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
