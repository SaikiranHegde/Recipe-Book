import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { HttpClient, HttpRequest } from "@angular/common/http";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.action$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.http.get<Recipe[]>('http://localhost:3000/api/recipes/');
        })
        .map(
            (recipes) => {                
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                }
            }
        );

    @Effect({dispatch: false})
    recipeStore = this.action$
        .ofType(RecipeActions.STORE_RECIPES)
        .switchMap((action: RecipeActions.StoreRecipes) => {
            const request = new HttpRequest('PUT', 'http://localhost:3000/api/recipes/' + action.payload.name, action.payload);
            return this.http.request(request);
        });

    constructor(private action$: Actions, private http: HttpClient) {}
}