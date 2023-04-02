import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import  AppService  from '../../config/service.json';
import { environment } from 'src/environments/environment';

import { IdTokenClaims, PromptValue } from '@azure/msal-common';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, PublicClientApplication, RedirectRequest, SsoSilentRequest } from '@azure/msal-browser';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { b2cPolicies, silentRequest } from '../../app/auth-config';
import { GraphAuthPolicies } from '../../config/graph-auth.config';
import { UserAccountStore } from '../stores/user-account.store';

import { msalConfigAd, connectToTenantLoginRequestAD } from '../../config/graph-auth.config'; 
import { AdGraphUserStore } from '../stores/ad-graph-user.store';
import { map, Observable } from 'rxjs';






@Injectable({ providedIn: 'root' })
export class UserGraphLoginService {
  private baseUrl: string;
  private tenantUpdateUrl : string

  public connectToTenantMsalInstance = new PublicClientApplication(msalConfigAd);


  constructor(
    private http: HttpClient,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authServiceAd: MsalService,
    private userAccountStore : UserAccountStore,
    private msalBroadcastService: MsalBroadcastService,
    private adGraphUserStore : AdGraphUserStore
  ) {
    
    this.baseUrl = environment.gatewayUrlForUserProfile;
    this.tenantUpdateUrl = AppService.appUrl.tenantUpdate;
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  adLogin() {
    this.connectToTenantMsalInstance.loginPopup(GraphAuthPolicies).then(res => {

        this.adGraphUserStore.setAdUserDetails(res);
        this.connectToTenantMsalInstance.setActiveAccount(res.account);
        

    })

  }

  getRefreshToken(){
        //this.connectToTenantMsalInstance.loginRedirect(GraphAuthPolicies);
        this.connectToTenantMsalInstance.acquireTokenSilent(silentRequest).then( res => {
          
        }
        )
  }


  getRefreshIDTokenByAccessToken(data) {

    
    console.log("****** Current Details ", data);
    let currentAccountDetails = data.connection.userAccessDetails;
    
    //this.connectToTenantMsalInstance.setActiveAccount(res.account);
    //"admin@skysecurelab.onmicrosoft.com"
    var currentAccount = this.connectToTenantMsalInstance.getAccountByUsername("admin@skysecurelab.onmicrosoft.com");
    
    var cc = {
      "homeAccountId": "49cfb63d-cf54-43ad-a32a-3cfbd71d51c8.d7ab1225-4649-4cb3-abd5-bc732bed3203",
      "environment": "login.windows.net",
      "tenantId": "d7ab1225-4649-4cb3-abd5-bc732bed3203",
      "username": "admin@skysecurelab.onmicrosoft.com",
      "localAccountId": "49cfb63d-cf54-43ad-a32a-3cfbd71d51c8",
      "name": "Skysecure Technologies Private Limited",
      "idTokenClaims": {
          "aud": "25a5e4d5-b46f-42ad-b556-9f1984b0b837",
          "iss": "https://login.microsoftonline.com/d7ab1225-4649-4cb3-abd5-bc732bed3203/v2.0",
          "iat": 1679500792,
          "nbf": 1679500792,
          "exp": 1679504692,
          "name": "Skysecure Technologies Private Limited",
          "nonce": "02c4ed80-a8b1-4ee5-89b7-87382dec196c",
          "oid": "49cfb63d-cf54-43ad-a32a-3cfbd71d51c8",
          "preferred_username": "admin@skysecurelab.onmicrosoft.com",
          "rh": "0.AXEAJRKr10lGs0yr1bxzK-0yA9XkpSVvtK1CtVafGYSwuDdxACI.",
          "sub": "ykvG0y3GQg2U67I-kKwlJV1VX6jMoEg8hilwiXdlePo",
          "tid": "d7ab1225-4649-4cb3-abd5-bc732bed3203",
          "uti": "DF2YdeqBeEqjBSbViGapAA",
          "ver": "2.0"
      }
  }
    var silentRequest2 = {
    scopes: [],
    account: currentAccountDetails,
    forceRefresh: false,
    loginHint: currentAccountDetails.username
    };

    let refreshToken = data.connection.refreshToken;
    // this.connectToTenantMsalInstance.acquireTokenSilent(silentRequest2).then( res => {
    //   console.log("((((((((((((((( ******* Value hit ", res);
    //   this.adGraphUserStore.setAdUserDetails(res);
    //   this.connectToTenantMsalInstance.setActiveAccount(res.account);
    //   this.updateTenant(data, res.account).subscribe();
    // }
    // )

    this.connectToTenantMsalInstance.acquireTokenSilent(silentRequest2)
      .then((res) => {
        console.log("((((((((((((((( ******* Value hit ", res);
        this.adGraphUserStore.setAdUserDetails(res);
        this.connectToTenantMsalInstance.setActiveAccount(res.account);
        this.updateTenant(data, res.account).subscribe();
      })
      .catch((error) => {
        console.log("Promise rejected with " + error);
        this.adLogin();
      });
      

  }


  public updateTenant(data, account): Observable<any> {

    const URL = this.baseUrl + this.tenantUpdateUrl;
    const OPTIONS = this.getOptions(data);

    let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    console.log("***(((())*&^%$% Token ");
    
    let request = {
        "userId": userAccountdetails._id,
        // "email": userAccountdetails.email,
        // "createdBy": userAccountdetails.createdBy,
        // "updatedBy": userAccountdetails.updatedBy,
        "userAccessDetails" : account
    };
    
    

      let REQUEST$ = this.http.patch<Observable<any>>(URL, request, OPTIONS)
      .pipe(
        map(response => {
          if (!response) {
            return null;
          }
          
          return response;
        }),
      );

      

    return REQUEST$;
  }


  /**
   * Stages our Http Request Headers
   */

  private getOptions(msAddata) : { headers: HttpHeaders } { 
 
    let token = this.userAccountStore.getAccessIdToken();
    let xAccessToken = this.adGraphUserStore.getAdUserDetails().accessToken;
    //let refreshToken = "0.AXEAJRKr10lGs0yr1bxzK-0yA9XkpSVvtK1CtVafGYSwuDdxACI.AgABAAEAAAD--DLA3VO7QrddgJg7WevrAgDs_wUA9P_81JEypTiuoU9WaH3AA0OfEHE2JorlmOdTNGG0sCp1wSfIzH_QkGA80S3p-fq2JOvzTvAj0JexImylUIoA8enqyORbHmSM_9Rhtw2Vayb5d1G4GFuhoTve5Oog6gxyY0ffTYownbwOoAcghCPHEe8hNOBBAYd9YFgYjT-SHfcIyT_UMGF8OIpYqcBYdvicL3RpykcoV37w1R0i8IaPDlEHliijGI3pAUz7dbBPvPSDRfDPK-o86EvfjMP-XIMebhoF9NQZg5c1bIgwOKpzmaS9GQg6S94haPsAAupyxB8q4Wx6197L09U0_GOwNf9ZWpeUSgip1brKxHYKFEq7jp8ABHU5we8j1Rai9iffcP9m5XtaUefQddbRBjuezZRnBZnqlDWKca4CMAUxVyQ0QY-897skDBMFoZ29vocN6c-t-D94tj9GXVQanq8jb_8enkQkCSPTw3VmobH2AqIuLwA93gI-JauHMzhwFkoKu2iT8oHEWfPJL5yng0WaXJlayuDpNBJcy_gyyr0hvqRtkNe2s2JCoOfN9yxtD6MB9rh6_qdBtHIqSBSx4zUTA4UECSkr8qNiXbSHx-oAa_dPOJR1F-j1J8b02MpcN6q8SYnoZN2E6SvfUah_lqqhjvnQ1Qx-nvZ2Vts_LHZgZ4GWkbgazScmXE-e3dWpWY0DjDfyros7XtsCXF8MhAabhthIuC08f-hlva5dB_ZPTGI4I1USMT-cPFtCtiwAhPvqpIGA3YKmPx_XaVI3JnJqM1pcoRBRKyADbp582Jb9L5nl0dhdwhe2YusNwrek_uNKayNYx78yoRL-_4dVyi5KLmt9_loKe1aSC2kk9BwywK8fAmaUwFl1695TFFrve7llhNE0hR3lE6NG"
    let refreshToken = msAddata.connection.refreshToken;




    //token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2Nzg3MjkzODMsIm5iZiI6MTY3ODcyNTc4MywidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9hbHRzeXNyZWFsaXplYXBwZGV2LmIyY2xvZ2luLmNvbS9kOTgyNWFlMC1lODQ3LTRjNTItOGYyZS05Y2E2ODk1NTg2NTYvdjIuMC8iLCJzdWIiOiI5MGY3YzkwYi1iNjI5LTRlYmQtYTgxZS0yMTU5MTk2ZDJiZTQiLCJhdWQiOiI0MDA4MDVmYi0yMTNmLTRjNmItYTM0Ni04Y2RlYTk5NzVhODgiLCJub25jZSI6IjU3NDFhZmMxLTkzMmQtNDZjZi05OTM5LTliNTU4YTEyMjc5YiIsImlhdCI6MTY3ODcyNTc4MywiYXV0aF90aW1lIjoxNjc4NzI1NzgxLCJjaXR5IjoiRGluZHVndWwiLCJjb3VudHJ5IjoiSW5kaWEiLCJnaXZlbl9uYW1lIjoiUmFuaml0aCIsInBvc3RhbENvZGUiOiI2MjQ2MjEiLCJmYW1pbHlfbmFtZSI6IlJhamFnb3BhbCIsImVtYWlscyI6WyJyYW5qaXRocmsyMjQ5OEBnbWFpbC5jb20iXSwidGZwIjoiQjJDXzFfc2lzdSJ9.sbp1--ctgFw2sxdl57TNS9nbBmvh3mvEhjq48RAmc5rfTZASEAS-MDeI7SsMqKN_8yaFmJ3J0C6tF0bZKUetfsP-HHIVURAobtKP6tr2wP6iS8sP8qJi-Q5SLuUojg2c-t3sUbMwhseJ7FlH8kkpJx-MdklqNz4LPC6q8vicQnZkGO_halczfORqxRLZkWL-iwk0ULxqy98NgOGPKFujh-c2htnMXWPA8BoL6R-wOaub-uuOn02u0W2GHLpW8CrngBmMYbiLZE_F-ZGgSz01J4cAK6jI2lU_DE8XrwsGLdGlZZA_I5cNTqiTW6TP3NrMMbi8RH8qW7NBGwnwPYIeww";
    //xAccessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9yZUMwa19UbUR2VlFBY2F4YzlnTDRlVjYtdEhDMzBMaVNCRllIdERFbGciLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kN2FiMTIyNS00NjQ5LTRjYjMtYWJkNS1iYzczMmJlZDMyMDMvIiwiaWF0IjoxNjc5MTk5MzE1LCJuYmYiOjE2NzkxOTkzMTUsImV4cCI6MTY3OTI4NjAxNSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyWmdZRkJabCtxOG43WEVSWEVYMXhUL2pLQisyN3JLcVZOVWF2bVoxUzRIcHpadEV2T1l0WUc5czdieGxzcXA1Ym5uWkMwVUFBPT0iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkFsdHN5cyBSZWFsaXplIEFuZ3VsYXIgVGVzdCIsImFwcGlkIjoiMjVhNWU0ZDUtYjQ2Zi00MmFkLWI1NTYtOWYxOTg0YjBiODM3IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJQcml2YXRlIExpbWl0ZWQiLCJnaXZlbl9uYW1lIjoiU2t5c2VjdXJlIFRlY2hub2xvZ2llcyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE3MS43Ni44Mi4yNDAiLCJuYW1lIjoiU2t5c2VjdXJlIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJvaWQiOiI0OWNmYjYzZC1jZjU0LTQzYWQtYTMyYS0zY2ZiZDcxZDUxYzgiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzIwMDE3QUYwQkIxQyIsInJoIjoiMC5BWEVBSlJLcjEwbEdzMHlyMWJ4ekstMHlBd01BQUFBQUFBQUF3QUFBQUFBQUFBQnhBQ0kuIiwic2NwIjoiQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5NZW1iZXJzaGlwIEFncmVlbWVudC5SZWFkV3JpdGUuQWxsIEF1ZGl0TG9nLlJlYWQuQWxsIERldmljZU1hbmFnZW1lbnRBcHBzLlJlYWRXcml0ZS5BbGwgRGV2aWNlTWFuYWdlbWVudENvbmZpZ3VyYXRpb24uUmVhZFdyaXRlLkFsbCBEaXJlY3RvcnkuUmVhZFdyaXRlLkFsbCBJZGVudGl0eVJpc2tFdmVudC5SZWFkLkFsbCBJZGVudGl0eVJpc2t5VXNlci5SZWFkLkFsbCBvcGVuaWQgUG9saWN5LlJlYWQuQWxsIFBvbGljeS5SZWFkLkNvbmRpdGlvbmFsQWNjZXNzIFBvbGljeS5SZWFkV3JpdGUuQXV0aGVudGljYXRpb25GbG93cyBQb2xpY3kuUmVhZFdyaXRlLkF1dGhlbnRpY2F0aW9uTWV0aG9kIFBvbGljeS5SZWFkV3JpdGUuQ29uZGl0aW9uYWxBY2Nlc3MgcHJvZmlsZSBSZXBvcnRzLlJlYWQuQWxsIFJvbGVNYW5hZ2VtZW50LlJlYWQuQWxsIFJvbGVNYW5hZ2VtZW50LlJlYWRXcml0ZS5DbG91ZFBDIFJvbGVNYW5hZ2VtZW50LlJlYWRXcml0ZS5EaXJlY3RvcnkgVXNlckF1dGhlbnRpY2F0aW9uTWV0aG9kLlJlYWRXcml0ZS5BbGwgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiI3VXJWMC1mZE1iR3B5TURzQVFLNVZBYlVTVzl1VnNhSkY1MjNSNjdodmZzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiZDdhYjEyMjUtNDY0OS00Y2IzLWFiZDUtYmM3MzJiZWQzMjAzIiwidW5pcXVlX25hbWUiOiJhZG1pbkBza3lzZWN1cmVsYWIub25taWNyb3NvZnQuY29tIiwidXBuIjoiYWRtaW5Ac2t5c2VjdXJlbGFiLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6ImJYTERWTHhvS0V1WW5nR2toOFJCQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19zc20iOiIxIiwieG1zX3N0Ijp7InN1YiI6InlrdkcweTNHUWcyVTY3SS1rS3dsSlYxVlg2ak1vRWc4aGlsd2lYZGxlUG8ifSwieG1zX3RjZHQiOjE2MzA5MDg1NTR9.ES4bBPJpVICgW0XzmF-72eiUahMbLnX4WFpclc1qaS5N0pPj9bCtG_OpMnigJNqxrb4PPjv9BebURam98c_FPqLP5qRUAR4RI-wKFdBisz1aVYymw9isvFtB3AaENhpWh03azUnfvFwYW9sahxdqHfXCAvMAGEdAkfWMSfWHWJYVgRgT1gbb9qeUyUnw4zIj-EnYhV8yqv-6Enso6saTgJEQth5kw7IW-pUHOTZl3FH22vfX6Rnu9I_n6dPVrAptg66al0E7Zp-a-7U3ZWpa0KESm4_C5en5XhLwcGcw6zevxU1ufpCy_oBWHHcp_CCwS2PxhHoCW3opbN5vZbaw-Q";

    //let xAccessToken = msAddata.
    const OPTIONS : { headers : HttpHeaders } = { 
      headers : new HttpHeaders() 
        .set('authorization', token) 
        .append('Content-Type', 'application/json')
        .append('x-access-token' , xAccessToken)
        .append('refreshToken' , refreshToken)
    }; 
 
    return OPTIONS; 
  }


}