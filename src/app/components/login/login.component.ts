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

  constructor(
    private _userService:UserService,
    private router:Router
  ) { 
    this.user= new User('','','','','','',true,false);
    
    
  }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this._userService.login(this.user).subscribe(
      response=>{

       if(response.user){
          this.router.navigate(['/tickets']);
          this.LoggedIn=!this.LoggedIn;  

        }

       else{this.status='failed'}
      
      },
      error=>{console.log(error)}
    );
  
  }

}

