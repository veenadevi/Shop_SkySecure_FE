import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './review-page.component';
import { ReviewHomeComponent } from './partials/review-home/review-home.component';
import { ReviewDetailPageComponent } from './partials/review-detail-page/review-detail-page.component';


const routes: Routes = [{
   path: '',
 component: ReviewPageComponent,

  children: [
    
    
    {
      canActivate: [],
      path: '',
      component : ReviewHomeComponent
    },
    {
      canActivate: [],
      path: 'review-detail-page',
      component : ReviewDetailPageComponent
    },
    
  ]
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewPageRoutingModule { }

export const ROUTED_COMPONENTS = [ ReviewPageComponent ];