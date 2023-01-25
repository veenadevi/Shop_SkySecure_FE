import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePgaeComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePgaeComponent,
    /*data: {
      title: 'Backlog'
    }*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ HomePgaeComponent ];
