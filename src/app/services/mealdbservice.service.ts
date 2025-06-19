import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealDbService {
  dataSource: string = 'https://www.themealdb.com/api/json/v1/1';
  search: string = 'search.php';
  lookup: string = 'lookup.php';
  random: string = 'random.php';
  list: string = 'list.php';
  filter: string = 'filter.php';

  constructor(private http: HttpClient) {}

  GetMealByName(name: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.dataSource}/${this.search}?s=${name}`)
      .pipe(map((response) => response.meals));
  }

  GetAllMealsByFirstLetter(letter: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.dataSource}/${this.search}?f=${letter}`)
      .pipe(map((response) => response.meals));
  }

  GetMealById(id: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.dataSource}/${this.lookup}?i=${id}`)
      .pipe(map((response) => response.meals));
  }

  GetRandomMeal(): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.dataSource}/${this.random}`)
      .pipe(map((response) => response.meals));
  }

  FilterByMainIngredient(ingredient: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(
        `${this.dataSource}/${this.filter}?i=${ingredient}`
      )
      .pipe(map((response) => response.meals));
  }

  FilterByArea(area: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.dataSource}/${this.filter}?a=${area}`)
      .pipe(map((response) => response.meals));
  }
}
