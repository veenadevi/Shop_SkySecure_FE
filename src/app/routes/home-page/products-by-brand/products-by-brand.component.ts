import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';

@Component({
  selector: 'products-by-brand',
  templateUrl: './products-by-brand.component.html',
  styleUrls: ['./products-by-brand.component.css']
})
export class ProductsByBrandComponent {

  private subscriptions : Subscription[] = [];


  /** Mock Data Var */
  public mockCategories : any[] = [];


  /** Constructor */
  constructor(
    private router: Router,
    private metadataSvc : MetadataService
    ) {
}


  public goToProductsPage(){
    this.router.navigate(['/products']);
  }

  public ngOnInit() : void {

    this.setCategoriesGrid();
    console.log("*** Resposne in category", this.mockCategories);
  }

  public setCategoriesGrid(){

    this.subscriptions.push(
      this.metadataSvc.fetchCategoryMock().subscribe( response => {
        console.log("*** res ", response.brands);
        this.mockCategories = response.brands;
      })
      
    );

  }

}
