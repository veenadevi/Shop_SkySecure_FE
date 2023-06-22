import { Component } from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { IdTokenClaims } from '@azure/msal-common';


type IdTokenClaimsWithPolicyId = IdTokenClaims & {
  acr?: string,
  tfp?: string,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'altsys_frontend';
    constructor(
    ) { }

  
}


