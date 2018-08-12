import * as firebase from 'firebase';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable()
export class AuthService {
    constructor(private router: Router, private http: Http, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

    signupUser(email: string, password: string) {
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        // .catch(
        //     error => console.log(error)            
        // );

        this.http.post('http://localhost:3000/api/users/', {email, password})
        .subscribe(
            (response: Response) => {
                this.router.navigate(['/signin']);
                console.log(response.json().data.email);                
            }
        );
    };

    signinUser(email: string, password: string) {
        // firebase.auth().signInWithEmailAndPassword(email, password)
        // .then(
        //     response => {
        //         this.router.navigate(['/']);
        //         firebase.auth().currentUser.getIdToken()
        //         .then(
        //             (token: string) => this.token = token
        //         );
        //     }            
        // )
        // .catch(
        //     error => console.log(error)            
        // );

        this.http.post('http://localhost:3000/api/users/authenticate', {email, password})
        .subscribe(
            (response: Response) => {
                let data = response.json();
                console.log(data);
                this.router.navigate(['/']);
                this.setToken(data.token);                
            }
        );
    }

    setToken(token) {
        this.storage.set('token', token);
    }

    getToken() {
        // firebase.auth().currentUser.getIdToken()
        // .then(
        //     (token: string) => this.token = token
        // );
        // return this.token;

        return this.storage.get('token');
    }

    isAuthenticated() {
        return this.getToken() != null;
    }

    logout() {
        this.storage.remove('token');
        this.router.navigate(['/signin']);
    }
}