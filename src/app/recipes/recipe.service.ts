import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>(); 
    private recipes: Recipe[] = [
        new Recipe('Recipe 1', 'Test Recipe 1',
         'assets/images/recipe1.jpeg',
        [
            new Ingredient('Ingredient1', 1),
            new Ingredient('Ingredient10', 20)
        ]),
        new Recipe('Recipe 2', 'Test Recipe 2',
         'assets/images/recipe2.png',
        [
            new Ingredient('Ingredient2', 1),
            new Ingredient('Ingredient20', 20)
        ])
    ];

    constructor(private shoppinglistService: ShoppingListService) {}

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.shoppinglistService.addIngredients(ingredients);
    }
}