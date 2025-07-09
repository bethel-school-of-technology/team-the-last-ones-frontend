import { Meal } from './meal';

// possible meals for the day
type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export class MPlan {
  mealsPlanId: number;
  userId: number;
  idMeal: number;
  timeOfDay: MealType;
  date: Date;
  thumb: string;
  mealName: string;

  constructor(
    mealsPlanId: number,
    userId: number,
    idMeal: number,
    timeOfDay: MealType,
    date: Date,
    thumb: string,
    mealName: string
  ) {
    this.mealsPlanId = mealsPlanId;
    this.userId = userId;
    this.idMeal = idMeal;
    this.timeOfDay = timeOfDay;
    this.date = date;
    this.thumb = thumb;
    this.mealName = mealName;
  }
}
