import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') shoppingListForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedIndex: number;
    editedItem: Ingredient;

    constructor(private shoppinglistService: ShoppingListService,
                private store: Store<fromShoppingList.AppState>) { }

    ngOnInit() {
        this.subscription = this.shoppinglistService.startedEditing.subscribe(
            (index: number) => {
                this.editMode = true;
                this.editedIndex = index;
                this.editedItem = this.shoppinglistService.getIngredient(index);
                this.shoppingListForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            }
        );
    }

    onSubmitItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.store.dispatch(new ShoppingListActions.UpdateIngredient(
                {index: this.editedIndex, ingredient: newIngredient}));
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
        }       
        form.reset();
        this.editMode = false;
    }

    onClear() {
        this.shoppingListForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedIndex));
        this.onClear();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
