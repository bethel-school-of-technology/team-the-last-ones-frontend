import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipeComponent {
  recipe = {
    name: '',
    ingredients: '',
    instructions: ''
  };

  recipes: any[] = [];
  showForm: boolean = false;
  searchQuery: string = '';

  onSubmit() {
    if (this.recipe.name && this.recipe.ingredients && this.recipe.instructions) {
      // Assign a simple ID for demo purposes
      const newRecipe = { ...this.recipe, id: Date.now() };
      this.recipes.push(newRecipe);

      // Reset form
      this.recipe = { name: '', ingredients: '', instructions: '' };
      this.showForm = false;
    }
  }

  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
  }

  onSearch() {
    if (this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase();
      this.recipes = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query)
      );
    }
  }
}
