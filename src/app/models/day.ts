import { MPlan } from './m-plan';

export class Day {
  label: string;
  date: Date;

  Breakfast: MPlan | null = null;
  Lunch: MPlan | null = null;
  Dinner: MPlan | null = null;

  constructor(label: string, date: Date) {
    this.label = label;
    this.date = date;
  }

  isDayEmpty(): boolean {
    return this.Breakfast == null && this.Lunch == null && this.Dinner == null;
  }

  getMeals(): { label: string; plan: MPlan | null }[] {
    return [
      { label: 'Breakfast', plan: this.Breakfast },
      { label: 'Lunch', plan: this.Lunch },
      { label: 'Dinner', plan: this.Dinner },
    ];
  }
}
