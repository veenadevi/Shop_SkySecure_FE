import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { IdTokenClaims, PromptValue } from '@azure/msal-common';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, PublicClientApplication, RedirectRequest, SsoSilentRequest } from '@azure/msal-browser';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { b2cPolicies, silentRequest } from '../../app/auth-config';
import { GraphAuthPolicies } from '../../config/graph-auth.config';
import { UserAccountStore } from '../stores/user-account.store';

import { msalConfigAd, connectToTenantLoginRequestAD } from '../../config/graph-auth.config'; 
import { AdGraphUserStore } from '../stores/ad-graph-user.store';






@Injectable({ providedIn: 'root' })
export class UserGraphLoginService {
  private baseUri: string;

  public connectToTenantMsalInstance = new PublicClientApplication(msalConfigAd);


  constructor(
    private http: HttpClient,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authServiceAd: MsalService,
    private userAccountStore : UserAccountStore,
    private msalBroadcastService: MsalBroadcastService,
    private adGraphUserStore : AdGraphUserStore
  ) {}

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
          console.log("********%%%%%%%%%%%% res", res);
        }
        )
  }


  getRefreshIDTokenByAccessToken() {
    //console.log("*******((((((((((( All Accounts ", this.connectToTenantMsalInstance.getAllAccounts());
    //"admin@skysecurelab.onmicrosoft.com"
    var currentAccount = this.connectToTenantMsalInstance.getAccountByUsername("admin@skysecurelab.onmicrosoft.com");
    console.log("******** Type of ", typeof(currentAccount));
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
    console.log("*******((((((((((( All Accounts ", currentAccount);
    var silentRequest2 = {
    scopes: [],
    account: cc,
    forceRefresh: false
    };

    this.connectToTenantMsalInstance.acquireTokenSilent(silentRequest2).then( res => {
      console.log("********%%%%%%%%%%%% res", res);
    }
    )

  }




}