import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../models/meal';
import { MPlan } from '../../models/m-plan';
import { AuthorizationService } from '../authorization/authorization.service';
import { MealCreateDto } from 'src/app/models/DTOs/meal-create-dto';

@Injectable({
  providedIn: 'root',
})
export class MealsplanService {
  baseUrl = 'http://localhost:5251/api/Meals';

  constructor(private http: HttpClient, private auth: AuthorizationService) {}

  private GetToken(): string | null {
    return this.auth.GetToken();
  }

  GetAllMealsPlanByUser(Id: number): Observable<MPlan[]> {
    let token = this.GetToken();
    let reqHeaders = {
      Authorization: `Bearer ${token}`,
    };
    console.log(`Attempting with token ${token}`);
    return this.http.get<MPlan[]>(`${this.baseUrl}/${Id}`, {
      headers: reqHeaders,
    });
  }

  CreateMealPlan(meal: MealCreateDto) {
    let token = this.GetToken();
    let reqHeaders = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(`${this.baseUrl}/create`, meal, {
      headers: reqHeaders,
    });
  }

  UpdateMealPlanById(meal: MPlan) {
    return this.http.put(`${this.baseUrl}/update${meal.mealsPlanId}`, meal);
  }

  DeleteMealPlanByMealsId(id: number) {
    let token = this.GetToken();
    let reqHeaders = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete(`${this.baseUrl}/delete${id}`, {
      headers: reqHeaders,
    });
  }

  GetMealPlanByMealId(id: number) {
    return this.http.get(`${this.baseUrl}/mealId${id}`);
  }
}
