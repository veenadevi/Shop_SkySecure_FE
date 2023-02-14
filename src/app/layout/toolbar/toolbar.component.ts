import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataService } from 'src/shared/services/metadata.service';
import { LoadingType } from 'src/shared/models/constnts/loading-type.enum';
import { CatrgoryResponse } from 'src/shared/models/interface/response/category-response';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(
    private metaDataSvc : MetadataService,
    private loaderService : LoaderService,
    private metadataStore : MetadataStore
  ){}

  private subscriptions: Subscription[] = [];

  public categories : CategoryDetails[] = [];
  


  private getCategories(): CategoryDetails[]{
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchCategory().subscribe( response => {
        this.metadataStore.setCategoryDetails(response.categorys);
        this.categories = response.categorys;
      })
      
    );
    return categoryResponse;
  }

  private getProducts(): ProductsDetails[]{
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchProducts().subscribe( response => {
        this.metadataStore.setProductsDetails(response.categorys);
        this.categories = response.products;
      })
      
    );
    return categoryResponse;
  }

  public ngOnInit() : void {

    
    this.getCategories();
    this.getProducts();
    
  }

}
