import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { PrimeNgModule } from './prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from "ngx-toastr";
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';

 
 


import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
    MsalGuard, MsalBroadcastService, MsalService,
    MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalGuardConfiguration, MsalRedirectComponent, MsalModule
} from '@azure/msal-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule, DecimalPipe } from '@angular/common';










/** Angular Material Imports */
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';




/** Angular Project Imports */
import { AppRoutingModule} from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InterfaceModule } from './interface/interface.module';
import { LoaderService } from 'src/shared/services/loader.service'; 
import { SharedModule } from 'src/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { loginRequest, msalConfig } from './auth-config';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { NgxOtpInputModule } from 'ngx-otp-input';

import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Login } from '@mui/icons-material';
import { FinanceUserPageComponent } from './routes/finance-user/finance-user-page.component';



/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
* Set your default interaction type for MSALGuard here. If you have any
* additional scopes you want the user to consent upon login, add them here as well.
*/
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
      interactionType: InteractionType.Redirect,
      authRequest: loginRequest
  };
}





@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    InterfaceModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    NgMultiSelectDropDownModule,
    MsalModule,
    NgxSpinnerModule,
    CommonModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    NgxOtpInputModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right',
      closeButton:true,
      preventDuplicates: false,
    //  timeOut:2000,
      maxOpened:4,

    }),
    NgxGoogleAnalyticsModule.forRoot('G-KC04RJ3FYD'),
    NgxGoogleAnalyticsRouterModule
    
 
    
   
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
        provide: MSAL_GUARD_CONFIG,
        useFactory: MSALGuardConfigFactory
    },
  
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => Login),
        multi: true,
      },
    
    LoaderService,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    LoaderService,
    DecimalPipe,

  ],
  declarations: [
    AppComponent,
   
   
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent, MsalRedirectComponent
  ],
  
})
export class AppModule { }
