import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators'; 
import { HttpClient, HttpRequest } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    // storeRecipes() {
    //     // const token = this.authService.getToken();
        
    //     // return this.http.put('https://recipe-book-4c1ac.firebaseio.com/recipes.json?auth=' + token, 
    //     // this.recipeService.getRecipes());

    //     return this.http.post('http://localhost:3000/api/recipes/', this.recipeService.getRecipes());
    // }

    storeRecipe(recipe: Recipe) {
        const name = recipe.name;

        // this.http.put('http://localhost:3000/api/recipes/' + name, recipe, { 
        //     // observe: 'events'
        //     // observe: 'body'
        //     // responseType: 'json'
        //     // headers: new HttpHeaders().set('Authorization', 'Some Token')
        //     // params: new HttpParams().set('auth', 'Some Token')
        // })
        // .subscribe(
        //     (response) => {
        //         console.log(response);                
        //     }
        // );

        const request = new HttpRequest('PUT', 'http://localhost:3000/api/recipes/' + name, recipe, { reportProgress: true });

        this.http.request(request)
        .subscribe(
            (response) => {
                console.log(response);                
            }
        );
    }

    getRecipes() {
        // const token = this.authService.getToken();

        // this.http.get('https://recipe-book-4c1ac.firebaseio.com/recipes.json?auth=' + token)
        
        this.http.get<Recipe[]>('http://localhost:3000/api/recipes/')
        .pipe(map(
            (recipes) => {                
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