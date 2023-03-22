// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

export const GraphAuthPolicies = {
    appId: '25a5e4d5-b46f-42ad-b556-9f1984b0b837',
    redirectUri: '/',
    //scopes: ['user.read', 'mailboxsettings.read', 'calendars.readwrite'],
    scopes: [
        "Reports.Read.All",
        "AccessReview.ReadWrite.All",
        "AccessReview.ReadWrite.Membership",
        "Agreement.ReadWrite.All",
        "AuditLog.Read.All",
        "Directory.ReadWrite.All",
        "IdentityRiskEvent.Read.All",
        "IdentityRiskyUser.Read.All",
        "Policy.Read.All",
        "Policy.Read.ConditionalAccess",
        "Policy.ReadWrite.AuthenticationFlows",
        "Policy.ReadWrite.AuthenticationMethod",
        "Policy.ReadWrite.ConditionalAccess",
        "RoleManagement.Read.All",
        "RoleManagement.ReadWrite.CloudPC",
        "RoleManagement.ReadWrite.Directory",
        "UserAuthenticationMethod.ReadWrite.All",
        "DeviceManagementConfiguration.ReadWrite.All", //MDE
        "DeviceManagementApps.ReadWrite.All"
      ],
  };

  export const connectToTenantMsalConfig = {
    auth: {
      clientId: '25a5e4d5-b46f-42ad-b556-9f1984b0b837', // This is the ONLY mandatory field that you need to supply.
      authority: "https://login.microsoftonline.com/common", // Defaults to "https://login.microsoftonline.com/common"
      redirectUri: "/", // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
      postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
      clientCapabilities: ["CP1"], // this lets the resource owner know that this client is capable of handling claims challenge.
    },
  
    cache: {
      cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      /**
       * Below you can configure MSAL.js logs. For more information, visit:
       * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
       */
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              return null;
          }
        },
      },
    },
  };
  
  /**
   * Scopes you add here will be prompted for user consent during sign-in.
   * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
   * For more information about OIDC scopes, visit:
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
   */
  export const connectToTenantLoginRequest = {
    scopes: [
      "Reports.Read.All",
      "AccessReview.ReadWrite.All",
      "AccessReview.ReadWrite.Membership",
      "Agreement.ReadWrite.All",
      "AuditLog.Read.All",
      "Directory.ReadWrite.All",
      "IdentityRiskEvent.Read.All",
      "IdentityRiskyUser.Read.All",
      "Policy.Read.All",
      "Policy.Read.ConditionalAccess",
      "Policy.ReadWrite.AuthenticationFlows",
      "Policy.ReadWrite.AuthenticationMethod",
      "Policy.ReadWrite.ConditionalAccess",
      "RoleManagement.Read.All",
      "RoleManagement.ReadWrite.CloudPC",
      "RoleManagement.ReadWrite.Directory",
      "UserAuthenticationMethod.ReadWrite.All",
      "DeviceManagementConfiguration.ReadWrite.All", //MDE
      "DeviceManagementApps.ReadWrite.All"
    ],
  };
  
  /**
   * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
   */
  export const connectToTenantProtectedResources = {
    graphContacts: {
      endpoint:
        "https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies",
      scopes: ["Policy.Read.All", "Policy.ReadWrite.ConditionalAccess"],
    },
  };




  //////// --------------------------------------------------------------------------------------------

 /**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */




const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Enter here the user flows and custom policies for your B2C application,
 * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPoliciesAD = {
    names: {
        signUpSignIn: "B2C_1_sisu",
        editProfile: "B2C_1_ProfileEdit",
        passwordReset:"B2C_1_PasswordReset"         
    },
    //https://altsysrealizeappdev.b2clogin.com/altsysrealizeappdev.onmicrosoft.com/<policy-name>/oauth2/v2.0/token
    authorities: {
        signUpSignIn: {
            authority: "https://altsysrealizeappdev.b2clogin.com/altsysrealizeappdev.onmicrosoft.com/B2C_1_sisu",
        },
        editProfile: {
            authority: "https://learnsmartcoding.b2clogin.com/learnsmartcoding.onmicrosoft.com/B2C_1_ProfileEdit"
        }
    },
    authorityDomain: "altsysrealizeappdev.b2clogin.com"
};

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
 export const msalConfigAd: Configuration = {
    auth: {
        clientId: "25a5e4d5-b46f-42ad-b556-9f1984b0b837", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/common", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/", // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        clientCapabilities: ["CP1"], // this lets the resource owner know that this client is capable of handling claims challenge.
      },
    
      cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
      },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

export const connectToTenantLoginRequestAD = {
    scopes: [
      "Reports.Read.All",
      "AccessReview.ReadWrite.All",
      "AccessReview.ReadWrite.Membership",
      "Agreement.ReadWrite.All",
      "AuditLog.Read.All",
      "Directory.ReadWrite.All",
      "IdentityRiskEvent.Read.All",
      "IdentityRiskyUser.Read.All",
      "Policy.Read.All",
      "Policy.Read.ConditionalAccess",
      "Policy.ReadWrite.AuthenticationFlows",
      "Policy.ReadWrite.AuthenticationMethod",
      "Policy.ReadWrite.ConditionalAccess",
      "RoleManagement.Read.All",
      "RoleManagement.ReadWrite.CloudPC",
      "RoleManagement.ReadWrite.Directory",
      "UserAuthenticationMethod.ReadWrite.All",
      "DeviceManagementConfiguration.ReadWrite.All", //MDE
      "DeviceManagementApps.ReadWrite.All"
    ],
  };

/**
* Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
*/
export const protectedResources = {
 todoListApi: {
   endpoint: "https://lsc-essential-products.azurewebsites.net",
   scopes: ["https://learnsmartcoding.onmicrosoft.com/essentialproducts/api/products.read",
           "https://learnsmartcoding.onmicrosoft.com/essentialproducts/api/products.write"],
 },
}

/**
* Scopes you add here will be prompted for user consent during sign-in.
* By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
* For more information about OIDC scopes, visit: 
* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
*/
export const loginRequest = {
 scopes: ["email"]
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "loginHint" property (such as a username). For more, visit:
 * https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-js-sso#sso-between-different-apps
 * If you do not receive the username claim in ID tokens, see also:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/FAQ.md#why-is-getaccountbyusername-returning-null-even-though-im-signed-in
 */
export const silentRequest = {
  scopes: [],
  loginHint: "example@domain.net"
};


  