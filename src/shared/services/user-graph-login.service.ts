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




}