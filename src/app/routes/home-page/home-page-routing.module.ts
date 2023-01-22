import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalSearchComponent } from './global-search/global-search.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalSearchComponent,
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
