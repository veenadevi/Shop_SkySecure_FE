import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';

@Component({
  selector: 'products-by-brand',
  templateUrl: './products-by-brand.component.html',
  styleUrls: ['./products-by-brand.component.css']
})
export class ProductsByBrandComponent {

  private subscriptions : Subscription[] = [];


  /** Mock Data Var */
  public mockCategories : any[] = [];


  public oems : any[] = [];

  /** Constructor */
  constructor(
    private router: Router,
    private metadataSvc : MetadataService,
    private metadataStore : MetadataStore 
    ) {
}

public oems$ = this.metadataStore.oemDetails$
  .pipe(
    map(data => {
      this.getBrands();
      if(data && data.length >7){
        
        return data;
        //return data.splice(0,7);
      }
      else{
        return data;
      }
    }
    )
  )

  private getBrands(): void {
    this.subscriptions.push(
       this.metadataSvc.fetchOEM().subscribe( response => {
    
        this.oems = response.oems;
        //this.selectedBrandItems = [];
       // this.getProductsByBrandIds(this.brand);
        //this.getProductsByBrandIds([this.brand]);
      })
    );
  }

  public goToProductsPage(){
    this.router.navigate(['/products']);
  }

  public ngOnInit() : void {

    this.getBrands();
    this.setCategoriesGrid();
   
  }

  public setCategoriesGrid(){

    this.subscriptions.push(
      this.oems$.subscribe(res => {
        
      })
    )
    

    // this.subscriptions.push(
    //   this.metadataSvc.fetchCategoryMock().subscribe( response => {
    //     console.log("*** res ", response.brands);
    //     this.mockCategories = response.brands;
    //   })
      
    // );

  }

  goToProductsPageByBrand(oem) {
    this.router.navigate([`/products/brand/${oem._id}`]);
  }


}
