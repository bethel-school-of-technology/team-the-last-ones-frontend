export class MealCreateDto {
	UserId: number;
	TimeOfDay: string;
	Date: Date;
	idMeal: number;

	constructor(
		userId: number,
		timeOfDay: string,
		date: Date,
		idMeal: number
	) {
		this.UserId = userId,
		this.TimeOfDay = timeOfDay,
		this.Date = date,
		this.idMeal = idMeal
	}
}
