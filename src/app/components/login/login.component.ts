import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {NgForm} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User;
  public status:string;
  public LoggedIn:boolean=false;
  public token:string;
  public error:string;

  constructor(
    private _userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    
    this._userService.login(
      form.value.email,form.value.password
      ).subscribe(
      response=>{

       if(response.dataUser){
         console.log('data user',response.dataUser)
          this.router.navigate(['/tickets']);
          
        }
      },
         errorMessage=>{
         console.log(errorMessage)
         this.error=errorMessage;
        }

    );
  
  }

}

