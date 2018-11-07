import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromRecipe.RecipeState>) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        );
    }

    onSubmit() {
        if (this.editMode) {
            // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
            this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, recipe: this.recipeForm.value}));
        } else {
            // this.recipeService.addRecipe(this.recipeForm.value);
            this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
        }
        // this.dataStorageService.storeRecipe(this.recipeForm.value);
        this.store.dispatch(new RecipeActions.StoreRecipes(this.recipeForm.value));
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    getControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
      }

    onAddingredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null,
                    [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        );
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            this.store.select('recipes').take(1)
            .subscribe((recipeState: fromRecipe.State) => {
                const recipe: Recipe = recipeState.recipes[this.id];
                recipeName = recipe.name;
                recipeImagePath = recipe.imagePath;
                recipeDescription = recipe.description;
                if (recipe.ingredients) {
                    for (let ingredient of recipe.ingredients) {
                        recipeIngredients.push(
                            new FormGroup({
                                'name': new FormControl(ingredient.name, Validators.required),
                                'amount': new FormControl(ingredient.amount,
                                    [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                            })
                        );
                    }
                }
            });            
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, [Validators.required, Validators.pattern(/^[A-Z]+[a-z]*[_]?[0-9]*$/)]),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }
}
