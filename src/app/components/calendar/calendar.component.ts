import { Component, OnInit } from '@angular/core';
import { MealDbService } from 'src/app/services/mealdb/mealdbservice.service';
import { Meal } from 'src/app/models/meal';
import { Router } from '@angular/router';
import { MPlan } from 'src/app/models/m-plan';
import { MealsplanService } from 'src/app/services/mealsplan/mealsplan.service';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';

interface DaysOfWeek {
  label: string;
  date: Date;
  key: string;
}

// possible meals for the day
type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

// data stored for a single meal slot on the calendar
interface PlannedMealSlot {
  id: number;
  name: string;
  thumb: string;
}

// a map of the meals for a single day
type DailyMealPlan = {
  [key in MealType]?: PlannedMealSlot;
};

// a map of all days in the calendar
type WeeklyMealPlan = {
  [dateKey: string]: DailyMealPlan;
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  userId: number = 1;
  meals: MealType[] = ['Breakfast', 'Lunch', 'Dinner'];
  daysOfWeek: DaysOfWeek[] = [];
  mealPlan: WeeklyMealPlan = {};
  availableRecipes: Meal[] = [];
  planMeals: MPlan[] = [];

  constructor(
    private router: Router,
    private MplanService: MealsplanService,
    private auth: AuthorizationService
  ) {}

  ngOnInit() {
    this.userId = this.auth.GetUserId();
    this.currentWeek();
    this.getAllPlanMeals(this.userId);
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
        day: 'numeric',
      });

      this.daysOfWeek.push({ label, date, key });

      // Initialize meals
      this.mealPlan[key] = this.mealPlan[key] || {};
    }
  }

  isDayEmpty(dateKey: string): boolean {
    // a daily meal plan object
    const dailyMealPlan = this.mealPlan[dateKey];
    if (!dailyMealPlan) return true;

    return Object.values(dailyMealPlan).every((slot) => slot === undefined);
  }

  goToRecipesPage() {
    this.router.navigate(['/recipes']);
  }

  goToRecipes(dateKey: string) {
    localStorage.setItem('selectedDateKey', dateKey);
    this.router.navigate(['/recipes']);
  }

  setMealForDay(dateKey: string, meal: string, recipe: Meal) {
    // this.mealPlan[dateKey][meal] = recipe.strMeal;
    // this.mealPlan[dateKey][meal + '_thumb'] = recipe.strMealThumb;
    // this.mealPlan[dateKey][meal + '_id'] = recipe.idMeal;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToRecipeDetails(mealId: number | undefined) {
    if (!mealId) {
      console.error('Missing meal ID');
      return;
    }
    console.log('Navigating to recipe with ID:', mealId); // Add this
    this.router.navigate(['/recipe-details', mealId]);
  }

  removeMeal(dateKey: string, meal: string) {
    // this.mealPlan[dateKey][meal] = '';
    // this.mealPlan[dateKey][meal + '_id'] = '';
    // this.mealPlan[dateKey][meal + '_thumb'] = '';
  }

  getAllPlanMeals(Id: number) {
    // TODO: Uncomment
    this.MplanService.GetAllMealsPlanByUser(Id).subscribe((result) => {
      const mealOrder: Record<MealType, number> = {
        Breakfast: 0,
        Lunch: 1,
        Dinner: 2,
      };

      const latestMeals: Partial<Record<MealType, MPlan>> = {};

      const sorted = result.sort((a, b) => {
        const dateA = new Date(a.date!).getTime();
        const dateB = new Date(b.date!).getTime();
        return dateB - dateA;
      });

      for (const meal of sorted) {
        const type = meal.timeOfDay as MealType;
        if (!latestMeals[type]) {
          latestMeals[type] = meal;
        }
        if (Object.keys(latestMeals).length === 3) break;
      }

      this.planMeals = Object.values(latestMeals);
      console.log(this.planMeals);
    });
  }
}
