import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isAuth:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged((user)=>{
      this.isAuth = user ? true: false;
    })
  }
  onSignOut(){
    this.authService.signOut();
  }

}
