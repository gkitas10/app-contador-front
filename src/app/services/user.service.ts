import { Injectable, isDevMode } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { environment } from '../../environments/environment';
import { environmentProd} from "src/environments/environment.prod";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public user = new BehaviorSubject<User>(null);
  public url: string;
  private expTimer:any;

  constructor(private _http: HttpClient, private router: Router) {

    this.url = isDevMode() ? environment.url : environmentProd.url;
  }

  signUp(
    name: string,
    email: string,
    password: string,
    img: string
  ): Observable<any> {
    let body = {
      name,
      email,
      password,
      img,
      role: "",
      status: true,
      google: false,
    };

    let Headers = new HttpHeaders().set("Content-type", "application/json");
    return this._http
      .post(this.url + "signup", body, { headers: Headers })
      .pipe(
        catchError((errRes) => {
          let errorMessage = "An error has occurred";
          if (!errRes.error) {
            return throwError(errorMessage);
          }
          if (errRes.error) {
            errorMessage = "Ya existe un usuario con este correo";
            return throwError(errorMessage);
          }
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      access_token: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.id,
      userData.email,
      userData.access_token,
      new Date(userData.tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expDuration=new Date(userData.tokenExpirationDate).getTime()-new Date().getTime()
      this.autoLogout(expDuration);
    }

  }

  login(email: string, password: string): Observable<any> {
    let body = { email: email, password: password };

    return this._http.post(this.url + "login", body).pipe(
      catchError((errRes) => {
        let errorMessage = "An error has occurred";
        if (!errRes.error) {
          return throwError(errorMessage);
        }
        if (errRes.error) {
          errorMessage = "User or password are incorrect";
          return throwError(errorMessage);
        }
      }),
      tap((resData) => {
        
        const tokenExpirationDate = new Date(
          new Date().getTime() + +resData.dataUser.expiresIn * 1000
        );

        const user = new User(
          resData.dataUser.id,
          resData.dataUser.email,
          resData.dataUser.access_token,
          tokenExpirationDate
        );
        this.user.next(user);
        //lo pasa de seg a mili
        this.autoLogout(resData.dataUser.expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
      
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login"]);
    localStorage.removeItem('userData');
    if(this.expTimer){
      clearTimeout(this.expTimer);
    }
    this.expTimer=null;
  }

  autoLogout(expDuration){
    this.expTimer=setTimeout(()=>{
      this.logout();
    },expDuration)
  }

  googleSignIn(idToken:string, FireUser:any ): Observable<any> {
    const body = { idToken, FireUser };
    return this._http.post(this.url + "google-sign-in", body) 
  }
}
