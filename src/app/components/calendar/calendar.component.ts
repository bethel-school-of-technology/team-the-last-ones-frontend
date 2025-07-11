import { Component, OnInit } from '@angular/core';
import { MealDbService } from 'src/app/services/mealdb/mealdbservice.service';
import { Meal } from 'src/app/models/meal';
import { Router } from '@angular/router';
import { MPlan } from 'src/app/models/m-plan';
import { MealsplanService } from 'src/app/services/mealsplan/mealsplan.service';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { Day } from 'src/app/models/day';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  userId: number = 1;

  calendarSchedule: Day[] = [];
  currentDaysofWeek: string[] = [];
  loop: string[] = ['Breakfast', 'Lunch', 'Dinner'];

  constructor(
    private router: Router,
    private mpService: MealsplanService,
    private authService: AuthorizationService,
    private mealDbService: MealDbService
  ) {}

  async ngOnInit() {
    this.userId = this.authService.GetUserId();

    // === Get all of the user's meals ===
    let allUserMeals = await firstValueFrom(
      this.mpService.GetAllMealsPlanByUser(this.authService.GetUserId())
    );

    // === Fill the calendar schedule with current empty days ===
    this.currentWeek();

    // === Sort all of the user's meals into their respective mealtimes ===
    let breakfasts = allUserMeals.filter((m) => m.timeOfDay === 'Breakfast');
    let lunches = allUserMeals.filter((m) => m.timeOfDay === 'Lunch');
    let dinners = allUserMeals.filter((m) => m.timeOfDay === 'Dinner');

    // === Assign all meals of a particular day to its respective day ===
    this.calendarSchedule.forEach((day) => {
      // Breakfast
      day.Breakfast = breakfasts
        .filter((breakfast) => {
          let dateA = new Date(
            Date.UTC(
              day.date.getUTCFullYear(),
              day.date.getUTCMonth(),
              day.date.getUTCDate()
            )
          );

          let breakfastDate = new Date(breakfast.date);
          let dateB = new Date(
            Date.UTC(
              breakfastDate.getUTCFullYear(),
              breakfastDate.getUTCMonth(),
              breakfastDate.getUTCDate()
            )
          );
          return (
            dateA.toISOString().split('T')[0] ===
            dateB.toISOString().split('T')[0]
          );
        })
        .sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);

          return dateB.getTime() - dateA.getTime();
        })[0];

      // Lunch
      day.Lunch = lunches
        .filter((lunch) => {
          let dateA = new Date(
            Date.UTC(
              day.date.getUTCFullYear(),
              day.date.getUTCMonth(),
              day.date.getUTCDate()
            )
          );

          let lunchDate = new Date(lunch.date);
          let dateB = new Date(
            Date.UTC(
              lunchDate.getUTCFullYear(),
              lunchDate.getUTCMonth(),
              lunchDate.getUTCDate()
            )
          );
          return (
            dateA.toISOString().split('T')[0] ===
            dateB.toISOString().split('T')[0]
          );
        })
        .sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);

          return dateB.getTime() - dateA.getTime();
        })[0];

      // Dinner
      day.Dinner = dinners
        .filter((dinner) => {
          let dateA = new Date(
            Date.UTC(
              day.date.getUTCFullYear(),
              day.date.getUTCMonth(),
              day.date.getUTCDate()
            )
          );

          let dinnerDate = new Date(dinner.date);
          let dateB = new Date(
            Date.UTC(
              dinnerDate.getUTCFullYear(),
              dinnerDate.getUTCMonth(),
              dinnerDate.getUTCDate()
            )
          );
          return (
            dateA.toISOString().split('T')[0] ===
            dateB.toISOString().split('T')[0]
          );
        })
        .sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);

          return dateB.getTime() - dateA.getTime();
        })[0];
    });

    console.log(this.calendarSchedule);
  }

  currentWeek() {
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const label = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      // this.daysOfWeek.push({ label, date, key });

      // Initialize meals
      let day = new Day(label, date);

      this.calendarSchedule.push(day);
    }
  }

  goToRecipes(): void {
    this.router.navigateByUrl('/recipes');
  }

  goToRecipe(recipeId: number | undefined): void {
    if (recipeId != null) this.router.navigateByUrl(`/recipes/${recipeId}`);
  }

  removeMeal(day: Day, type: string | undefined): void {
    console.log(day.Breakfast?.mealsPlanId);

    if (type === 'Breakfast') {
      console.log('type is Breakfast');
      if (day.Breakfast?.mealsPlanId != null) {
        this.mpService
          .DeleteMealPlanByMealsId(day.Breakfast.mealsPlanId)
          .subscribe({
            next: () => {
              console.log('Breakfast deleted successfully');
              day.Breakfast = null;
            },
            error: (err) => {
              console.error('Failed to delete breakfast:', err);
            },
          });
      }
    }

    if (type === 'Lunch') {
      if (day.Lunch?.mealsPlanId != null) {
        this.mpService
          .DeleteMealPlanByMealsId(day.Lunch.mealsPlanId)
          .subscribe({
            next: () => {
              console.log('Lunch deleted successfully');
              day.Lunch = null;
            },
            error: (err) => {
              console.error('Failed to delete lunch:', err);
            },
          });
      }
    }

    if (type === 'Dinner') {
      if (day.Dinner?.mealsPlanId != null) {
        this.mpService
          .DeleteMealPlanByMealsId(day.Dinner.mealsPlanId)
          .subscribe({
            next: () => {
              console.log('Dinner deleted successfully');
              day.Dinner = null;
            },
            error: (err) => {
              console.error('Failed to delete dinner:', err);
            },
          });
      }
    }
  }
}
