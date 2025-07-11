import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipes/recipes.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'profile', component: ProfileComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
