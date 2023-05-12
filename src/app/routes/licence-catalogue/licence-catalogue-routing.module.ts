import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenceCatalogueComponent } from './licence-catalogue.component';


const routes: Routes = [
  {
    path: '',
    component: LicenceCatalogueComponent,
    // children: [
    //   {
    //     canActivate: [],
    //     path: 'quotation-history',
    //     component : QuotationHistoryComponent
    //   },
      
    // ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenceCatalogueRoutingModule { }

/* Export Feature Components */
export const ROUTED_COMPONENTS = [ LicenceCatalogueComponent ];
