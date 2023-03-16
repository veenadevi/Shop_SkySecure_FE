import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { IdTokenClaims, PromptValue } from '@azure/msal-common';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest, SsoSilentRequest } from '@azure/msal-browser';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { b2cPolicies, silentRequest } from '../../app/auth-config';
import { UserAccountStore } from '../stores/user-account.store';




@Injectable({ providedIn: 'root' })
export class LoginService {
  private baseUri: string;


  constructor(
    private http: HttpClient,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private userAccountStore : UserAccountStore,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
        if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
            if (this.msalGuardConfig.authRequest) {
                this.authService.loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as PopupRequest)
                    .subscribe((response: AuthenticationResult) => {
                        this.authService.instance.setActiveAccount(response.account);
                        this.userAccountStore.setuserAccountDetails(response.account);
                        this.retrieveAccessIdToken();
                    });
            } else {
                this.authService.loginPopup(userFlowRequest)
                    .subscribe((response: AuthenticationResult) => {
                        this.authService.instance.setActiveAccount(response.account);
                        this.userAccountStore.setuserAccountDetails(response.account);
                        this.retrieveAccessIdToken();
                    });
            }
        } else {
                if (this.msalGuardConfig.authRequest) {
                    this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest);
                } else {
                    this.authService.loginRedirect(userFlowRequest);
                }
        }
    }

    logout() {
        this.authService.logout();
    }

    editProfile() {
        let editProfileFlowRequest: RedirectRequest | PopupRequest = {
            authority: b2cPolicies.authorities.editProfile.authority,
            scopes: [],
        };

        this.login(editProfileFlowRequest);
    }


    public retrieveAccessIdToken() : any {
        this.authService.acquireTokenSilent(silentRequest).subscribe( res => {
            this.userAccountStore.setAccessIdToken(res.idToken);
          })
    }


}