import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email:string, pass:string){
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().createUserWithEmailAndPassword(email, pass).then(
          () => { resolve(resolve); },
          (error) => { reject(error); }
        );
      }
    );
  }
  signInUser(email:string, pass:string){
    return new Promise(
      (resolve, reject) => {
        firebase.default.auth().signInWithEmailAndPassword(email, pass).then(
          () => { resolve(resolve); },
          (error) => { reject(error); }
        );
      }
    );
  }
  signOut(){
    firebase.default.auth().signOut();
  }
}
