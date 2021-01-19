import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import "firebase/auth";
import { Router } from "@angular/router";
import { UserService } from './user.service';

 interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

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
      console.log(result)
      // this._userService.signUp(
      //   result.user.displayName,
      //   result.user.email,
      //   ':)',
        

    //     form.value.name,
    // form.value.email,
    // form.value.password,
    // form.value.img
     // )
    
      
    }).catch((error) => {
      window.alert(error)
    })
  }

  signOut(){
    return this.afAuth.signOut();
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }
  //Firebase docs
  
}
