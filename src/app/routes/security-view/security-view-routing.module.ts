import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationsComponent } from './partials/recommendations/recommendations.component';
import { SecurityViewComponent } from './security-view.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityViewComponent,
    children: [
      {
        canActivate: [],
        path: 'recommendations',
        component : RecommendationsComponent
      },
      
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityViewRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ SecurityViewComponent ];
