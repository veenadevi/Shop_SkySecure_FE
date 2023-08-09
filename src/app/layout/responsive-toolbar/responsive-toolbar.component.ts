import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, map } from 'rxjs';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { OEMDetails } from 'src/shared/models/interface/partials/oem-details';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { CartService } from 'src/shared/services/cart.service';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataService } from 'src/shared/services/metadata.service';
import { ProductListService } from 'src/shared/services/product-list-page.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent  implements OnInit{


  constructor(
    private metaDataSvc : MetadataService,
    private loaderService : LoaderService,
    private cartService : CartService,
    private metadataStore : MetadataStore,
    private userAccountStore : UserAccountStore,
    private router : Router,
    private productListService: ProductListService,
    private spinnerService : NgxSpinnerService
  ){}

  private subscriptions: Subscription[] = [];

  public categories : CategoryDetails[] = [];

  public softwareCategories : CategoryDetails[] = [];

  public hardwareCategories : CategoryDetails[] = [];

  public oemList : OEMDetails[]=[];

  public compareProducts : any[] = [];

  public offers : any[] = [];

  public userLoggedIn : boolean = false;

  public userDetails$ = this.userAccountStore.userDetails$
  .pipe(
    map(data => {
      if(data){
        
        this.userLoggedIn = true;
        return data;
      }
      else{
        
        this.userLoggedIn = false;
        return data;
      }
    }
    )
  )

  ngOnInit(): void {

    this.getCategories();
    this.getProducts();
    this.getOEMs();
    this.getTrendingProducts();
    this.userDetails$.subscribe();
    this.setNavBar();

  }

  private getCategories(): CategoryDetails[]{
    this.spinnerService.show();
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchCategory().subscribe( response => {
        this.metadataStore.setCategoryDetails(response.categorys);
        this.categories = response.categorys;
        this.softwareCategories = response.categorys;
        this.hardwareCategories = null;
      })
      
    );
    this.spinnerService.hide();
    return categoryResponse;
  }


  private getProducts(): ProductsDetails[]{
    this.spinnerService.show();
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchProducts().subscribe( response => {
        this.metadataStore.setProductsDetails(response.products);
      })
      
    );
    this.spinnerService.hide();
    return categoryResponse;
  }


  private getOEMs(): OEMDetails[]{
    this.spinnerService.show();
    let OEMResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchOEM().subscribe( response => {
        this.metadataStore.setOEMDetails(response.oems);
        this.oemList = response.oems;
        this.spinnerService.hide();
      })
      
    );
    return OEMResponse;
  }

  private getTrendingProducts() : void {
    this.spinnerService.show();
    this.subscriptions.push(
      this.metaDataSvc.fetchTrendingProducts().subscribe( response => {
        this.metadataStore.setTrendingProducts(response.products);
        this.spinnerService.hide();
      })
      
    );
  }


  public setNavBar(){
    let navbar : HTMLElement = document.querySelector(".navbar");

    // sidebar open close js code
    let navLinks : HTMLElement = document.querySelector(".nav-links");
    let menuOpenBtn : HTMLElement = document.querySelector(".navbar .bx-menu");
    let menuCloseBtn : HTMLElement = document.querySelector(".nav-links .bx-x");



    // sidebar submenu open close js code
    let htmlcssArrow : HTMLElement = document.querySelector(".htmlcss-arrow");
    htmlcssArrow.onclick = function() {
    navLinks.classList.toggle("show1");
    }
    let moreArrow : HTMLElement = document.querySelector(".more-arrow");
    moreArrow.onclick = function() {
    navLinks.classList.toggle("show2");
    }
    let jsArrow : HTMLElement = document.querySelector(".js-arrow");
    jsArrow.onclick = function() {
    navLinks.classList.toggle("show3");
    }
  }
  

}


