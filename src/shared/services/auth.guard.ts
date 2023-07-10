import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log("()()()() Auth Gaurd If", localStorage.getItem('XXXXaccess__tokenXXXX'));  
    if (this.authService.isLoggedIn !== true) {
      //window.alert("Access not allowed!");
      console.log("()()()() Auth Gaurd If");
      //this.router.navigate(['log-in'])
    }
    else{
        console.log("()()()() Auth Gaurd Else ");
        //this.router.navigate([''])
    }
    return true;
  }
}