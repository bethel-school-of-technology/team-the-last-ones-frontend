import { Component } from '@angular/core';
import { MealDbService } from 'src/app/services/mealdb/mealdbservice.service';
import { Meal } from 'src/app/models/meal';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipeComponent {
  searchQuery = '';
  meals: Meal[] = [];
  errorMessage = '';

  constructor(
    private mealService: MealDbService,
    private router: Router,
    private authService: AuthorizationService
  ) {}

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
        },
      });
    }
  }

  ngOnInit() {
    this.getAllMeals();
  }

  getAllMeals(): void {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    letters.forEach((letter) => {
      this.mealService.GetAllMealsByFirstLetter(letter).subscribe({
        next: (data) => {
          if (data) {
            this.meals = [...this.meals, ...data];
          }
        },
        error: () => {
          console.warn(`No meals found for letter: ${letter}`);
        },
      });
    });
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

  goToRecipeDetails(id: string) {
    this.router.navigate(['/recipes', id]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/recipes']);
  }
}
