import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ROUTED_COMPONENTS, LicenceCatalogueRoutingModule } from './licence-catalogue-routing.module';
import { LicenceCatalogueComponent } from './licence-catalogue.component';




@NgModule({
  declarations: [
    ROUTED_COMPONENTS,
    LicenceCatalogueComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    LicenceCatalogueRoutingModule
  ],
  exports: [
    RouterModule,
    SharedModule,
  ]
})
export class LicenceCatalogueModule { }
