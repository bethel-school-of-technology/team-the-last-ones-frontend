export class MealCreateDto {
  UserId: number;
  TimeOfDay: string;
  Date: Date;
  idMeal: number;
  Thumb: string;
  MealName: string;

  constructor(
    userId: number,
    timeOfDay: string,
    date: Date,
    idMeal: number,
    thumb: string,
    mealName: string
  ) {
    this.UserId = userId;
    this.TimeOfDay = timeOfDay;
    this.Date = date;
    this.idMeal = idMeal;
    this.Thumb = thumb;
    this.MealName = mealName;
  }
}
