import { Injectable } from '@angular/core';
import { User } from "../models/user";
import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import "firebase/auth";
import { Router } from "@angular/router";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router:Router,
    private _userService:UserService
  ) { }

   // Sign in with Google
   GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider())
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      firebase.auth().currentUser.getIdToken().then((idToken)=>{
      this._userService.googleSignIn(idToken, result.user).subscribe(resData => {
      const tokenExpirationDate = new Date(
               new Date().getTime() + +resData.dataUser.expiresIn * 1000
          );

      const user = new User(
      resData.dataUser.id,
      resData.dataUser.email,
      resData.dataUser.access_token,
      tokenExpirationDate
    );

      this._userService.user.next(user)
      this._userService.autoLogout(resData.dataUser.expiresIn * 1000);
      localStorage.setItem("userData", JSON.stringify(user));
      this.router.navigate(['/ticket']);

      }, error => {
        this._userService.logout()
      })
    })

    }).catch((error) => {
      console.log(error)
    })
  }

  signOut(){
    return this.afAuth.signOut();
  }
  
  
}
