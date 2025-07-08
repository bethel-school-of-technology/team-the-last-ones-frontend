import { Meal } from './meal';

// possible meals for the day
type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export class MPlan {
  MPlanId: number;
  userId: number;
  idMeal: number;
  timeOfDay: MealType;
  date: Date;
  meal: Meal;

  constructor(
    mPlanId: number,
    userId: number,
    idMeal: number,
    timeOfDay: MealType,
    date: Date,
    meal: Meal
  ) {
    this.MPlanId = mPlanId;
    this.userId = userId;
    this.idMeal = idMeal;
    this.timeOfDay = timeOfDay;
    this.date = date;
    this.meal = meal;
  }
}
