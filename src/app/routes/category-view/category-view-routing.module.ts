import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryViewComponent } from './category-view.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryViewComponent,
    /*data: {
      title: 'Backlog'
    }*/
    children: [
      // {
      //   path: '',
      //   redirectTo: 'summary'
      // },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryViewRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ CategoryViewComponent ];
