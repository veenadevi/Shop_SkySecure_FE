import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { MetadataService } from 'src/shared/services/metadata.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {

  private subscriptions : Subscription[] = [];

  public cartItems : any;

  public params : any;

  constructor(
    private globalSearch : GlobalSearchService,
    private route : ActivatedRoute
  ) {}


  public ngOnInit() : void {
    this.fetchCategoryMock();
  }

  public fetchCategoryMock() : void{

    //let paramss = this.route.snapshot.queryParamMap;

    this.params = this.route.snapshot.queryParamMap;

    // console.log("********* Pamars ", paramss);
    // console.log("********* Pamars ", paramss.get('productName'));
    
    // this.route.queryParamMap
    //   .subscribe((params) => {
    //       console.log("********* Params ", params);
    //       console.log("********* Params ", params.get('params'));
    //       this.params = params.get('params');
    //       }
    //   );
    this.subscriptions.push(
      this.globalSearch.fetchCartMock().subscribe( response => {
        this.cartItems = response.category;
      })
      
    );
  
}
}
