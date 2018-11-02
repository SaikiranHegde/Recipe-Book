import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
    .ofType(AuthActions.TRYSIGNUP)
    .map((action: AuthActions.TrySignup) => {
        return action.payload;
    })
    .switchMap((authData: {email: string, password: string}) => {
        return this.http.post('http://localhost:3000/api/users/', authData);
    })
    .mergeMap((response) => {
        this.router.navigate(['/']);
        return [
            {
                type: AuthActions.SIGNUP
            },
            {
                type: AuthActions.SETTOKEN,
                payload: response['token']
            }
        ];
    })

    @Effect()
    authSignIn = this.actions$
    .ofType(AuthActions.TRYSIGNIN)
    .map((action: AuthActions.TrySignin) => action.payload)
    .switchMap((authData: {email: string, password: string}) => {
        return this.http.post('http://localhost:3000/api/users/authenticate', authData)
    })
    .mergeMap((response) => {
        this.router.navigate(['/']);
        return [
            {
                type: AuthActions.SIGNIN
            },
            {
                type: AuthActions.SETTOKEN,
                payload: response['token']
            }
        ]
    });

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}