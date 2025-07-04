import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../models/meal';
import { MPlan } from '../../models/m-plan';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class MealsplanService {
  baseUrl = 'http://localhost:5251/api/Meals';

  constructor(private http: HttpClient, private auth: AuthorizationService) {}

  private GetToken(): string | null {
    return this.auth.GetToken();
  }

  GetAllMealsPlanByUser(Id: number): Observable<any> {
    let token = this.GetToken();
    let reqHeaders = {
      Authorization: `Bearer ${token}`
    };
    console.log(`Attempting with token ${token}`);
    return this.http.get<{ meals: any }>(`${this.baseUrl}/${Id}`, { headers: reqHeaders});
  }

  CreateMealPlan(meal: MPlan) {
    let token = this.GetToken();
    let reqHeaders = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.baseUrl}/create`, meal, { headers: reqHeaders });
  }

  UpdateMealPlanById(meal: MPlan) {
    return this.http.put(`${this.baseUrl}/update${meal.planId}`, meal);
  }

  DeleteMealPlanByMealsId(id: number) {
    return this.http.delete(`${this.baseUrl}/delete${id}`);
  }

  GetMealPlanByMealId(id: number) {
    return this.http.get(`${this.baseUrl}/mealId${id}`);
  }
}
