import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonViewComponent } from './ion-view.component';
import { OrdersListComponent } from './partials/orders-list/orders-list.component';


const routes: Routes = [
  {
    path: '',
    component: IonViewComponent,
    children: [
      {
        canActivate: [],
        path: 'orders-list',
        component : OrdersListComponent
      },
      
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IonViewRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ IonViewComponent ];
