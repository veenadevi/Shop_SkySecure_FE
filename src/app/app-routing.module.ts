import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';

import { InterfaceModule  } from './interface/interface.module';
import { AuthGuard } from 'src/shared/services/auth.guard';

/**
 * Changed loading strategy from Lazy to Eager
 *
 * Notice the 'loadChildren` property below and the imported preloadingStrategy
 */
const appRoutes : Routes = [

  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'login',
  // },

  {
    // Needed for handling redirect after login
    path: 'auth',
    component: MsalRedirectComponent
  },

  /**
   * The InterfaceModule is the acting root entry point for all feature routes
   * and layout components.
   *
   * Optional: Add canActivate to prevent unauthorized user from access this route.
   */
  {
    path: '',
    loadChildren: () => import('./interface/interface.module').then(m => m.InterfaceModule),
    data: {
      preload: true
      //activities: ['Admin']
    },
    //canActivate : [AuthGuard]
  },

  { 
    path: 'login', 
    loadChildren: () => import('./login-signup/login-signup.module').then(m => m.LoginSignupModule) 
  },

  { path: 'review-page', loadChildren: () => import('./routes/review-page/review-page.module').then(m => m.ReviewPageModule) },

  

  

  /**
   * The router will select this route if the current user is try to access the application using
   * an unsupported browser.
   * 
   * Supported browsers:
   * - Chrome
   * - Firefox
   * - Safari
   */
  /*{   To be implemented Later
    path: 'browser-not-supported',
    component: BrowserNotSupportedComponent,
    data: {
      title: 'Browser Not Supported'
    }
  }, */

  /**
   * The router will select this route if the requested URL doesn't match any of the defined paths
   */
  
  /*{   To be implemented Later
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }*/

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
