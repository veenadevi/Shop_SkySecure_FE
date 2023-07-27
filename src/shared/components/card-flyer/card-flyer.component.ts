import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/shared/services/login.service';
import { LoginAlertModalComponent } from '../login-alert-modal/login-alert-modal.component';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

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

  public showModal : boolean = false;

  constructor(
    private router: Router,
    private authService : MsalService,
    private loginService : LoginService,
    private modalService : NgbModal,
    private userAccountStore : UserAccountStore
  ){}

  public requestQuote(product:any){
    // console.log("***** Sample Product", product);
    let queryParams = {
      productName : product.name,
      productId : product._id,
      quantity : 1,
      price : product.priceList[0].price,
    };

    let loggedinData = this.authService.instance.getAllAccounts().filter(event => (event.environment === "altsysrealizeappdev.b2clogin.com" || event.environment === "realizeSkysecuretech.b2clogin.com"));

    this.userAccountStore.userDetails$.subscribe(res=>{
      // console.log("()()()() ", res);
      if(res && res.email !== null){
        this.router.navigate(['/cart'], {queryParams: queryParams});
      }
      else{
        this.viewModal(queryParams);
      }
    })
    /*if(loggedinData.length > 0 ){
      //this.userLoggedIn = true;
      this.router.navigate(['/cart'], {queryParams: queryParams});
    }

    else{
      //this.showModal = !this.showModal;
      this.viewModal(queryParams);
    }*/

    
    
  }


  public viewModal(queryParams) {
    const modalRef = this.modalService.open(LoginAlertModalComponent);
    modalRef.componentInstance.request = queryParams;
  }

  public navigateToProductDetails(product:any){
    
    if(this.routePath === 'productBundles'){
      this.router.navigate(['/products/brand-detail', product._id]);
    }
    else{
      this.router.navigate(['/products', product._id]);
    }
    //this.router.navigate(['/products', product._id]);
  }

  public closeModal() {
    this.showModal = false;
  }

}
