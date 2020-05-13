import {Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {take, exhaustMap} from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private _userService:UserService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
        return this._userService.user.pipe(take(1),exhaustMap(user=>{
            if(!user){return next.handle(req)}
            const reqModified=req.clone(
                {headers:new HttpHeaders().set('access_token',user.token)}
                )
            return next.handle(reqModified);
        }))

     
    }
    

}