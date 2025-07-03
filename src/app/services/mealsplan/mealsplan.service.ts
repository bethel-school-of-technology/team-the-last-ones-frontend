import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../../models/meal';
import { MPlan } from '../../../models/m-plan';

@Injectable({
  providedIn: 'root',
})
export class MealsplanService {
  baseUrl = 'http://localhost:5251/api/meals';

  constructor(private http: HttpClient) {}

  GetAllMealsPlanByUser(Id: number): Observable<any> {
    return this.http.get<{ meals: any }>(`${this.baseUrl}${Id}`);
  }

  CreateMealPlan(meal: MPlan) {
    return this.http.post(`${this.baseUrl}/create`, meal);
  }

  UpdateMealPlanById(meal: MPlan) {
    return this.http.put(`${this.baseUrl}/update${meal.mealId}`, meal);
  }

  DeleteMealPlanByMealsId(id: number) {
    return this.http.delete(`${this.baseUrl}/delete${id}`);
  }

  GetMealPlanByMealId(id: number) {
    return this.http.get(`${this.baseUrl}/mealId${id}`);
  }
}
