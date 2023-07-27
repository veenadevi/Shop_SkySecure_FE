import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';
import { UserAccountStore } from '../stores/user-account.store';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private userAccountStore : UserAccountStore
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let encodedVal = localStorage.getItem('XXXXaccess__tokenXXXX');
        //console.log("Auth Gaurd If", localStorage.getItem('XXXXaccess__tokenXXXX'));  
        //console.log("Auth Gaurd If", this.authService.isLoggedIn); 
    if (this.authService.isLoggedIn !== true) {
      //window.alert("Access not allowed!");
      // console.log("()()()() Auth Gaurd If");
      //this.router.navigate([''])
    }
    else{
        // console.log("******* Auth Gaurd Else ");
        //this.router.navigate([''])
        var decoded = jwtDecode(encodedVal);
        // console.log("***** The res is ", decoded);
        this.userAccountStore.setUserDetails(decoded);
        //this.router.navigate(['/']);
    }
    return true;
  }
}