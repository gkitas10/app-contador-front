import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {NgForm} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User;
  public status:string;
  public isLoggedIn:boolean;
  public token:string;
  public error:string;
  public userSub:Subscription;

  constructor(
    private _userService:UserService,
    private router:Router,
    public _googleAuth:GoogleAuthService
  ) { }

  ngOnInit() {
    this.userSub = this._userService.user.subscribe((user) => {
      this.isLoggedIn = !user ? false : true;
      console.log(isDevMode());
       
    });
    
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSubmit(form:NgForm){
    console.log('jecutando')
    this._userService.login(
      form.value.email,form.value.password
      ).subscribe(
      response=>{

       if(response.dataUser){
         console.log('data user',response.dataUser)
          this.router.navigate(['/ticket']);
          
        }
      },
         errorMessage=>{
         console.log(errorMessage)
         this.error=errorMessage;
        }

    );
  
  }


}

