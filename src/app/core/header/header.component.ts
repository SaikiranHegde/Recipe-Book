import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private dataStorageService: DataStorageService, private store: Store<fromApp.AppState>,
        private router: Router) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/']);
    }
}
