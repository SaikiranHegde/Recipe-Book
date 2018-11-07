import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private store: Store<fromRecipe.RecipeState>, private router: Router) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onFetchData() {
        // this.dataStorageService.getRecipes();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/']);
    }
}
