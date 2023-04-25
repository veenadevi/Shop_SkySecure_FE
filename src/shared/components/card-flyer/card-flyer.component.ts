import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'card-flyer',
  templateUrl: './card-flyer.component.html',
  styleUrls: ['./card-flyer.component.css']
})
export class CardFlyerComponent {

  @Input('product')
  public product : any;

  @Input('routePath')
  public routePath : string;

  constructor(
    private router: Router,
    private authService : MsalService,
    private loginService : LoginService,
  ){}

  public requestQuote(product:any){

    let queryParams = {
      productName : product.name,
      productId : product._id,
      quantity : 1,
    };
    this.router.navigate(['/cart'], {queryParams: queryParams});

    // let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com"));
    // console.log("++++ ((( ", loggedinData);
    // if(loggedinData.length > 0 ){
    //   //this.userLoggedIn = true;
    //   this.router.navigate(['/cart'], {queryParams: queryParams});
    // }
    // else {
    //   this.loginService.login();
    //   //this.router.navigate(['/cart'], {queryParams: queryParams});
    // }
  }

  public navigateToProductDetails(product:any){
    
    this.router.navigate(['/products', product._id]);
  }

}
