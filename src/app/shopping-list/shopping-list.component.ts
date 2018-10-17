import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    state: Observable<{ ingredients: Ingredient[] }>;

    constructor(private shoppinglistService: ShoppingListService, 
        private store: Store<fromShoppingList.AppState>) { }

    ngOnInit() {
        this.state = this.store.select('shoppingList');
    }
    
    onEditItem(index: number) {
        this.shoppinglistService.startedEditing.next(index);
    }
}
