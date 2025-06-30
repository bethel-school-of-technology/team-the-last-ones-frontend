export class MPlan {
    planId: number;
    userId: number;
    timeOfDay: string;
    date: Date;
    mealId: number 

    constructor(planId:number, userId:number, timeOfDay:string, date:Date, mealId:number){
        this.planId = planId;
        this.userId = userId;
        this.timeOfDay = timeOfDay;
        this.date = date;
        this.mealId = mealId;
    }
}
