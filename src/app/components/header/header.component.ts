import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  private userSub: Subscription;

  constructor(private _userService: UserService, private _googleAuth:GoogleAuthService) {}

  ngOnInit() {
    this.userSub = this._userService.user.subscribe((user) => {
      this.isLoggedIn = !user ? false : true;
     
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this._userService.logout();
    this._googleAuth.signOut();
  }
}
