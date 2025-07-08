import { MPlan } from './m-plan';

export class Day {
  label: string;
  date: Date;
  key: string;

  Breakfast?: MPlan | null;
  Lunch?: MPlan | null;
  Dinner?: MPlan | null;

  AllDailyMealPlans: (MPlan | null)[] = [null, null, null];

  constructor(
    label: string,
    date: Date,
    key: string,
    breakfast?: MPlan,
    lunch?: MPlan,
    dinner?: MPlan
  ) {
    this.label = label;
    this.date = date;
    this.key = key;

    this.Breakfast = breakfast;
    this.Lunch = lunch;
    this.Dinner = dinner;

    this.AllDailyMealPlans = [breakfast ?? null, lunch ?? null, dinner ?? null];
  }

  isDayEmpty(): boolean {
    return this.Breakfast == null && this.Lunch == null && this.Dinner == null;
  }

  updateMealArray(): void {
    this.AllDailyMealPlans = [
      this.Breakfast ?? null,
      this.Lunch ?? null,
      this.Dinner ?? null,
    ];
  }

  removeMeal(mplanId: number): void {
    if (this.Breakfast?.MPlanId === mplanId) this.Breakfast = null;
    if (this.Lunch?.MPlanId === mplanId) this.Lunch = null;
    if (this.Dinner?.MPlanId === mplanId) this.Dinner = null;

    this.AllDailyMealPlans = [
      this.Breakfast ?? null,
      this.Lunch ?? null,
      this.Dinner ?? null,
    ];
  }
}
