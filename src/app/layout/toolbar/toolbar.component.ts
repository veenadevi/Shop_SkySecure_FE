import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataService } from 'src/shared/services/metadata.service';
import { LoadingType } from 'src/shared/models/constnts/loading-type.enum';
import { CatrgoryResponse } from 'src/shared/models/interface/response/category-response';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { Router } from '@angular/router';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { OEMDetails } from 'src/shared/models/interface/partials/oem-details';
import { OEMResponse } from 'src/shared/models/interface/response/oem-response';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(
    private metaDataSvc : MetadataService,
    private loaderService : LoaderService,
    private metadataStore : MetadataStore,
    private userAccountStore : UserAccountStore,
    private router : Router
  ){}

  private subscriptions: Subscription[] = [];

  public categories : CategoryDetails[] = [];

  public softwareCategories : CategoryDetails[] = [];

  public hardwareCategories : CategoryDetails[] = [];

  public oemList : OEMDetails[]=[];


  private getCategories(): CategoryDetails[]{
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchCategory().subscribe( response => {
        this.metadataStore.setCategoryDetails(response.categorys);
        console.log("Settign up response.categorys splice before"+response.categorys);
        this.categories = response.categorys.splice(0,10);
        this.softwareCategories = response.categorys.splice(0,10);
        this.hardwareCategories = response.categorys.splice(0, 10, 15);
      })
      
    );
    console.log("categoryResponse "+categoryResponse)
    return categoryResponse;
  }


  private getOEMs(): OEMDetails[]{
    let OEMResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchOEM().subscribe( response => {
        console.log("Settign up splice before"+response.oem);
        this.metadataStore.setOEMDetails(response.oem);
        this.oemList = response.oems.splice(0,10);
        
      })
      
    );
    console.log("OEMResponse "+OEMResponse)
    return OEMResponse;
  }
  private getProducts(): ProductsDetails[]{
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchProducts().subscribe( response => {
        this.metadataStore.setProductsDetails(response.products);
      })
      
    );
    return categoryResponse;
  }



  public ngOnInit() : void {

    this.getCategories();
    this.getProducts();
    this.getOEMs();
  }

  public goToProductsPage(){
    this.router.navigate(['/products']);
  }

}
