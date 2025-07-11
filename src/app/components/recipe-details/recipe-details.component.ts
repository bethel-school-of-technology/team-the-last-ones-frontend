import { Component } from '@angular/core';
import { MealDbService } from 'src/app/services/mealdb/mealdbservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { MPlan } from 'src/app/models/m-plan';
import { MealsplanService } from 'src/app/services/mealsplan/mealsplan.service';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { MealCreateDto } from 'src/app/models/DTOs/meal-create-dto';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent {
  meal: Meal | null = null;
  UserId: number = 1;
  ingredients: string[] = [];
  instructions: string[] = [];
  selectedDay: Date = new Date();
  selectedMeal: string = 'Breakfast';
  weekDates: { key: Date; label: string }[] = [];

  constructor(
    private mealDbService: MealDbService,
    private router: Router,
    private route: ActivatedRoute,
    private MplanService: MealsplanService,
    private auth: AuthorizationService
  ) {}

  ngOnInit() {
    this.UserId = this.auth.GetUserId();

    this.route.paramMap.subscribe((params) => {
      const mealId = params.get('id');

      if (mealId) {
        this.mealDbService.GetMealById(mealId).subscribe({
          next: (data) => {
            if (Array.isArray(data)) {
              this.meal = data[0] || null;
            } else {
              this.meal = data;
            }

            if (this.meal) {
              this.ingredients = this.extractIngredients(this.meal);
              this.instructions = this.extractInstructions(this.meal);
            } else {
              console.error('No meal found for id:', mealId);
            }
          },
          error: () => {
            console.error('Error fetching meal details');
          },
        });
      }
    });

    this.generateWeekDates();
  }

  extractInstructions(meal: any): string[] {
    const instructions: string[] = [];
    if (meal.strInstructions) {
      instructions.push(meal.strInstructions);
    }
    return instructions;
  }
  extractIngredients(meal: any): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim() !== '') {
        ingredients.push(`${measure} ${ing}`.trim());
      }
    }
    return ingredients;
  }

  generateWeekDates() {
    const today = new Date();
    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const key = date;
      // console.log('key: ', key);
      const label = date.toDateString();
      // console.log('label: ', label);
      this.weekDates.push({ key, label });
    }

    if (this.weekDates.length > 0) {
      this.selectedDay = this.weekDates[0].key;
    }
  }

  addToCalendar() {
    if (!this.meal) {
      console.error('No meal selected to add to calendar');
      return;
    }

    // const data = {
    //   day: this.selectedDay,
    //   meal: this.selectedMeal,
    //   recipe: {
    //     id: this.meal.idMeal,
    //     name: this.meal.strMeal,
    //     thumb: this.meal.strMealThumb
    //   }
    // };

    // let selectedDate = this.toUTCDateOnly(this.selectedDay);
    let storeDate = new Date(this.selectedDay);
    storeDate = this.toUTCDateOnly(storeDate);

    let newMealPlanDto = new MealCreateDto(
      this.UserId,
      this.selectedMeal,
      storeDate,
      parseInt(this.meal.idMeal),
      this.meal.strMealThumb,
      this.meal.strMeal
    );

    this.MplanService.CreateMealPlan(newMealPlanDto).subscribe(
      () => {
        window.alert('Plan was Successfully made');
      },
      (error) => {
        console.log('Error: ', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    );

    // const stored = localStorage.getItem('plannedRecipes');
    // const plannedRecipes = stored ? JSON.parse(stored) : [];

    // plannedRecipes.push(data);

    // localStorage.setItem('plannedRecipes', JSON.stringify(plannedRecipes));

    this.router.navigate(['/calendar']);
  }
  goToRecipes() {
    this.router.navigate(['/recipes']);
  }
  goToRecipesDetails(id: number) {
    this.router.navigate([`'/recipes/${id}'`]);
  }
  goToCalendar() {
    this.router.navigate(['/calendar']);
  }

  toUTCDateOnly(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      )
    );
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
