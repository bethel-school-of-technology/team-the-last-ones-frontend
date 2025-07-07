import { Meal } from './meal';

export class MPlan {
  MPlanId: number;
  userId: number;
  timeOfDay: string;
  date: Date;
  meal: Meal;

  constructor(
    mPlanId: number,
    userId: number,
    timeOfDay: string,
    date: Date,
    meal: Meal
  ) {
    this.MPlanId = mPlanId;
    this.userId = userId;
    this.timeOfDay = timeOfDay;
    this.date = date;
    this.meal = meal;
  }
}
