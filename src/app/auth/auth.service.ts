import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
    constructor(private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        private store: Store<fromApp.AppState>) {}

    signupUser(email: string, password: string) {
        this.http.post('http://localhost:3000/api/users/', {email, password})
        .subscribe(
            (response) => {
                this.store.dispatch(new AuthActions.Signup());
                this.store.dispatch(new AuthActions.SetToken(response['token']));
                this.router.navigate(['/']);
                console.log(response);                
            }
        );
    };

    signinUser(email: string, password: string) {
        this.http.post('http://localhost:3000/api/users/authenticate', {email, password})
        .subscribe(
            (response) => {
                console.log(response);
                this.store.dispatch(new AuthActions.Signin());
                this.store.dispatch(new AuthActions.SetToken(response['token']));
                this.router.navigate(['/']);
                // this.setToken(response['token']);                
            }
        );
    }

    logout() {
        // this.storage.remove('token');
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/signin']);
    }

    // setToken(token) {
    //     this.storage.set('token', token);
    // }

    // getToken() {
    //     return this.storage.get('token');
    // }

    // isAuthenticated() {
    //     return this.getToken() != null;
    // }
}