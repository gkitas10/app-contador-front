import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import { Global } from './Global';
import {Observable} from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;

  constructor(
    private _http:HttpClient
  ) { 
    this.url=Global.url;
  }

  signUp(user:User):Observable<any>{
    let body=user;
    let Headers=new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url+'signup',body,{headers:Headers});
  
  }

  login(user:User):Observable<any>{
    let body=user;
    return this._http.post(this.url+'login',body);

  }

  getUsers():Observable<any>{
    let Headers=new HttpHeaders().set('Content-type','application/json');
    return this._http.get(this.url+'getusers',{headers:Headers});

  }
  
}
