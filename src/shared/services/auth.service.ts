import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import AppService  from '../../config/service.json';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string;
  private globalSearchUrl : string;
  private signUpURL : string;
  private signInURL : string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = environment.gatewayUrlForUserProfile;
    this.signUpURL = AppService.appUrl.userSignUp;
    this.signInURL = AppService.appUrl.userLogin;

  }


  public signin(req) : Observable<any>{

    let url = this.baseUrl+this.signInURL;
    //"http://localhost:2003/api/user/login";

    
    let request$ = this.http.post(url, req)
      .pipe(
        map(response=> {
          if (!response) {
            return null;
          }
          
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }

  public signUp(req) : Observable<any>{

    let url = this.baseUrl+this.signUpURL;

    
    let request$ = this.http.post(url, req)
      .pipe(
        map(response=> {
          if (!response) {
            return null;
          }
          
          return response;
        }),
        catchError(error => {
          // create operation mapping for http exception handling 
          return (error);
        })
      );

    return request$;
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('XXXXaccess__tokenXXXX');
    return authToken !== null ? true : false;
  }


  public signOut() {
    
  }
  





}