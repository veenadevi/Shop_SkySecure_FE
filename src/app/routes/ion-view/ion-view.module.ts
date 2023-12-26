import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTED_COMPONENTS, IonViewRoutingModule } from './ion-view-routing.module';
import { IonViewComponent } from './ion-view.component';
import { OrdersListComponent } from './partials/orders-list/orders-list.component';




@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    IonViewComponent,
    OrdersListComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    IonViewRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class IonViewModule { }
