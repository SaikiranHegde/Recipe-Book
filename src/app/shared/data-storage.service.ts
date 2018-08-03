import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { map } from 'rxjs/operators'; 

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        // const token = this.authService.getToken();
        
        // return this.http.put('https://recipe-book-4c1ac.firebaseio.com/recipes.json?auth=' + token, 
        // this.recipeService.getRecipes());

        return this.http.post('http://localhost:3000/api/recipes/', this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        // this.http.get('https://recipe-book-4c1ac.firebaseio.com/recipes.json?auth=' + token)
        
        this.http.get('http://localhost:3000/api/recipes/')
        .pipe(map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        ))
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}