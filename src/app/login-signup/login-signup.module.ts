import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PrimeNgModule } from '../prime-ng.module';
import { SharedModule } from 'src/shared/shared.module';

import { LoginSignupRoutingModule } from './login-signup-routing.module';
import { LoginSignupComponent } from './login-signup.component';
import { LoginComponent } from './partials/login/login.component';
import { SignUpComponent } from './partials/sign-up/sign-up.component';


@NgModule({
  declarations: [
    LoginSignupComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimeNgModule,
    SharedModule,
    LoginSignupRoutingModule
  ],
  exports: [
    MaterialModule,
    PrimeNgModule,
    SharedModule,
  ]
})
export class LoginSignupModule { }
