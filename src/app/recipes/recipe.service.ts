import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Recipe_1', 'Test Recipe 1',
         'assets/images/recipe1.jpeg',
        [
            new Ingredient('Ingredient1', 1),
            new Ingredient('Ingredient10', 20)
        ]),
        new Recipe('Recipe_2', 'Test Recipe 2',
         'assets/images/recipe2.png',
        [
            new Ingredient('Ingredient2', 1),
            new Ingredient('Ingredient20', 20)
        ])
    ];

    constructor() {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    callRecipesChanged() {
        this.recipesChanged.next(this.getRecipes());
    }

    // addIngredients(ingredients: Ingredient[]) {
    //     //this.shoppinglistService.addIngredients(ingredients);
    //     }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.callRecipesChanged();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.callRecipesChanged();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.callRecipesChanged();
    }
}