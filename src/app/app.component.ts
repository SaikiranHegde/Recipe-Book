import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loadedFeature = 'recipe';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: "AIzaSyB7ghmrAcgjfjJi2wk6KS4tkQPj3l4pmCM",
            authDomain: "recipe-book-4c1ac.firebaseapp.com"
        });
    }

    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
