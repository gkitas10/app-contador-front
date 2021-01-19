import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public url:String;
  public reqStatus:String;
  public error:string;

  constructor(
    private router: Router,
    private _userService:UserService
    
  ) { }

  ngOnInit() {
    console.log(firebase)
   }

onSubmit(form:NgForm){
  this._userService.signUp(
    form.value.name,
    form.value.email,
    form.value.password,
    form.value.img

  ).subscribe(
    response=>{
      console.log(response);
      if(response.user){
        this.reqStatus='succeed';
        this.router.navigate(['/login']);
        form.reset();
      }
    },
    errorMessage=>{
      this.error=errorMessage;
      console.log(errorMessage)
      this.reqStatus='failed';
    }
  );
  

}
}
