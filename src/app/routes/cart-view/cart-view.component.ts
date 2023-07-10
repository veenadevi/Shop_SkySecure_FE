import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { LoginService } from 'src/shared/services/login.service';
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
    private route : ActivatedRoute,
    private authService : MsalService,
    private loginService : LoginService,
  ) {}


  public ngOnInit() : void {

    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com" || event.environment === "realizeskysecuretech.b2clogin.com"))
    
    
    /*if(loggedinData.length > 0 ){
      //this.userLoggedIn = true;
      //this.fetchCategoryMock();
    }

    else{
      this.loginService.login();
      //this.fetchCategoryMock();
    }*/
    
  }

  public fetchCategoryMock() : void{

    //let paramss = this.route.snapshot.queryParamMap;

    this.params = this.route.snapshot.queryParamMap;

    this.subscriptions.push(
      this.globalSearch.fetchCartMock().subscribe( response => {
        this.cartItems = response.category;
      })
      
    );
  
}
}
