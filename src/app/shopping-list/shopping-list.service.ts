import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";


export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Orange', 5)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    callIngredientsChanged() {
        this.ingredientsChanged.next(this.getIngredients());
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.callIngredientsChanged();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.callIngredientsChanged();
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.callIngredientsChanged();
    }
}