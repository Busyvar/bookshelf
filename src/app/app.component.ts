import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'bookshelves';
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBs5phBPQUnT8FlVj8aZWTzuJFAmt4LErY",
      authDomain: "bookshelf-6c646.firebaseapp.com",
      databaseURL: "https://bookshelf-6c646-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "bookshelf-6c646",
      storageBucket: "bookshelf-6c646.appspot.com",
      messagingSenderId: "370335462630",
      appId: "1:370335462630:web:46113037bf6e866e127727"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);

  }
}
