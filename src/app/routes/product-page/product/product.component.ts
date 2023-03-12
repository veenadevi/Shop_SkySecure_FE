import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { ProductsDetails } from 'src/shared/models/interface/partials/products-details';
import { LoginService } from 'src/shared/services/login.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() products : Array<any> = [];

  constructor ( 
    private authService : MsalService,
    private loginService : LoginService,
    private router : Router
  ){

  }


  public requestQuote (product : ProductsDetails) : void {

    this.router.navigate(['/cart']);

    
    // if(this.authService.instance.getAllAccounts().length > 0){
    //   console.log("***** Product ", product._id);
    // }
    // else {
    //   //console.log("**** Call Login");
    //   this.loginService.login();
    //   this.router.navigate(['/cart']);
    // }
    


  }
  
}
