import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from './user.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class AuthguardService implements CanActivate {
    constructor(
        private _userService:UserService,
        private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.user.pipe(take(1),map(user=>{
        const isLoggedin=!!user;
        if(isLoggedin){
            return true;
        }
        return this.router.createUrlTree(['/login'])
    }))
  }
}
