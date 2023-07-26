import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-company-prompt-modal',
  templateUrl: './company-prompt-modal.component.html',
  styleUrls: ['./company-prompt-modal.component.css']
})
export class CompanyPromptModalComponent {

  @Input('request')
  public request : any;

  public companyName : String; 

  

  public subscriptions : Subscription[] = [];
  constructor(
    private cartService : CartService,
    private router : Router,
    public activeModal: NgbActiveModal,
    public userProfileService : UserProfileService,
    private userAccountStore : UserAccountStore
  ){

  }

  ngOnInit(){
    // console.log("********* Req", this.request);

    //this.createQuotationService();
  }

  public createQuotationService(){
    let req = this.request;
    req.companyName = this.companyName;

    this.activeModal.close();
    this.updateProfile(this.companyName);
    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        // console.log("**** ++++++++  response is ", response);
        if(response && response.Accounts && response.Accounts){
          if(response.Accounts.code === 'SUCCESS'){
            this.cartService.getCartItems(null).subscribe();
            this.router.navigate(['/cart/cart-submit']);
          } 
          else {
            // console.log("/**** Some error occurred ****/ ");
          }
        }
        else{
          // console.log("/**** Some error occurred ****/ ");
        }
        
      })
    )
  }

  public updateProfile(companyName){
    
    //let userAccountdetails = this.userAccountStore.getUserProfileDetails();
    let userAccountdetails = this.userAccountStore.getUserDetails();

    // console.log("++++++++ Details ", userAccountdetails);

    let req = {
      "email" : userAccountdetails.email,
      "company" : companyName,
      
    }

    this.subscriptions.push(
      this.userProfileService.updateUserProfile(req).subscribe( response => {
        // console.log("***** ++++++ Updated ", response);
      })
    )
  }



}
