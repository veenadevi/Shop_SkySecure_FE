import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { IdTokenClaims } from '@azure/msal-common';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { DOCUMENT } from '@angular/common';


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
 
      private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
    ) {
    this.handleRouteEvents();
     }

     handleRouteEvents() {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const title = "Skysecure Marketplace";
          this.titleService.setTitle(title);
          gtag('event', 'page_view', {
            page_title: title,
            page_path: event.urlAfterRedirects,
            page_location: this.document.location.href
          })
        }
      });
    }

    getTitle(state: RouterState, parent: ActivatedRoute): string[] {
      const data = [];
      if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
        data.push(parent.snapshot.data['title']);
      }
      if (state && parent && parent.firstChild) {
        data.push(...this.getTitle(state, parent.firstChild));
      }
      return data;
    }
}




