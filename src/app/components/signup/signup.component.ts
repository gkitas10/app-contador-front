import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user:User;
  public url:String;
  public reqStatus:String;

  constructor(
    private _userService:UserService
  ) { 
    this.user= new User('','','','','','',true,false);
  }

  ngOnInit() {
    this._userService.getUsers().subscribe(
      response=>{
        console.log(response);

      },
      error=>{console.log(error)}
    )
  }
onSubmit(form:NgForm){
  this._userService.signUp(this.user).subscribe(
    response=>{
      console.log(response);
      if(response.user){
        this.reqStatus='succeed';
      }
      
    },
    error=>{
      console.log(error)
    }
  );
  

}
}
