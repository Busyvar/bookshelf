import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.default.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            resolve(true);
          } else {
            this.router.navigate(["/auth", "signin"]);
            resolve(false);
          }
        });
    })
  }
}
