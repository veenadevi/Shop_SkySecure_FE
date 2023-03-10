import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    /*data: {
      title: 'Backlog'
    }*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ UserProfileComponent ];
