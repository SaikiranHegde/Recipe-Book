import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRecipe from '../store/recipe.reducers';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipeState: Observable<fromRecipe.State>;
    
    constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRecipe.RecipeState>) { }

    ngOnInit() {
        // this.subscription = this.recipeService.recipesChanged.subscribe(
        //     (recipes: Recipe[]) => {
        //         this.recipes = recipes;
        //     }
        // );
        // this.recipes = this.recipeService.getRecipes();

        this.recipeState = this.store.select('recipes');
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }
}
