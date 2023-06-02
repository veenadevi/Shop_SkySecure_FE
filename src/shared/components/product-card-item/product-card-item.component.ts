import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'product-card-item',
  templateUrl: './product-card-item.component.html',
  styleUrls: ['./product-card-item.component.css']
})
export class ProductCardItemComponent implements OnInit{

  @Input('productList')
  public productList : any[];

  @Input('routePath')
  public routePath : string;


  constructor(
    private router: Router,
    private authService : MsalService,
    private loginService : LoginService,
  ){}


  public ngOnInit(): void {
  }


  public requestQuote(product:any){

    let queryParams = {
      productName : product.name,
      productId : product._id,
      quantity : 1,
    };



    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com"));
    console.log("++++ ((( ", loggedinData);
    if(loggedinData.length > 0 ){
      //this.userLoggedIn = true;
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }
    else {
      this.loginService.login();
      //this.router.navigate(['/cart'], {queryParams: queryParams});
    }
    
  }

  public navigateToProductDetails(product:any){
    /*console.log("**************** ++++++++ ", this.type);
    if(this.type === 'productBundles'){
      this.router.navigate(['/products/brand-detail', product._id]);
    }
    else{
      this.router.navigate(['/products', product._id]);
    }*/
    

  }

}
