import { Component, OnInit } from '@angular/core';
import { MealDbService } from 'src/app/services/mealdbservice.service';
import { Meal } from 'src/app/models/meal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  meals = ["Breakfast", "Lunch", "Dinner"];
  daysOfWeek: { label: string; date: Date; key: string }[] = [];
  mealPlan: { [dateKey: string]: { [meal: string]: string } } = {};
  availableRecipes: Meal[] = [];


  constructor(private mealDbService: MealDbService, private router: Router) { }

  ngOnInit() {
    this.currentWeek();
    this.loadPlannedRecipes();
  }

  currentWeek() {
    const today = new Date();
    this.daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const key = date.toISOString().split('T')[0];
      const label = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      this.daysOfWeek.push({ label, date, key });

      // Initialize meals
      this.mealPlan[key] = this.mealPlan[key] || {};
      this.meals.forEach((meal) => {
        if (!this.mealPlan[key][meal]) {
          this.mealPlan[key][meal] = '';
          this.mealPlan[key][meal + '_thumb'] = '';
        }
      });
    }
  }

  loadPlannedRecipes() {
    const stored = localStorage.getItem('plannedRecipes');
    const plannedRecipes = stored ? JSON.parse(stored) : [];

    plannedRecipes.forEach((entry: any) => {
      const dateKey = entry.day;
      const mealType = entry.meal;

      if (!this.mealPlan[dateKey]) {
        this.mealPlan[dateKey] = {};
      }

      this.mealPlan[dateKey][mealType] = entry.recipe.name;
      this.mealPlan[dateKey][mealType + '_thumb'] = entry.recipe.thumb;
      this.mealPlan[dateKey][mealType + '_id'] = entry.recipe.id;
    });
  }


  isDayEmpty(dateKey: string): boolean {
    return this.meals.every(
      (meal) => !this.mealPlan[dateKey][meal]
    );
  }




  goToRecipes(dateKey: string) {
    localStorage.setItem('selectedDateKey', dateKey);
    this.router.navigate(['/recipes']);
  }

  setMealForDay(dateKey: string, meal: string, recipe: Meal) {
    this.mealPlan[dateKey][meal] = recipe.strMeal;
    this.mealPlan[dateKey][meal + '_thumb'] = recipe.strMealThumb;
    this.mealPlan[dateKey][meal + '_id'] = recipe.idMeal;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToRecipeDetails(mealId: string) {
    if (!mealId) {
      console.error('Missing meal ID');
      return;
    }
    console.log('Navigating to recipe with ID:', mealId); // Add this
    this.router.navigate(['/recipe-details', mealId]);
  }

}
