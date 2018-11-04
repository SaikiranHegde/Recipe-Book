import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from './recipe.actions';

export interface RecipeState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
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
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const uRecipes = [...state.recipes];
            uRecipes[action.payload.index] = action.payload.recipe;
            return {
                ...state,
                recipes: uRecipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const dRecipes = [...state.recipes];
            dRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: dRecipes
            }
        default:
            return state;
    }
}