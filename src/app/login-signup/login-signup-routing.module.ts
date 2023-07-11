import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup.component';
import { LoginComponent } from './partials/login/login.component';
import { SignUpComponent } from './partials/sign-up/sign-up.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoginSignupComponent,
    children: [
      {
        canActivate: [],
        path: '',
        component : LoginComponent
      },
      {
        canActivate: [],
        path: 'signUp',
        component : SignUpComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSignupRoutingModule { }
