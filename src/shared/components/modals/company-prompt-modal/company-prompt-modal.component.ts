import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';

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
    public activeModal: NgbActiveModal
  ){

  }

  ngOnInit(){
    console.log("********* Req", this.request);

    //this.createQuotationService();
  }

  public createQuotationService(){
    let req = this.request;
    req.companyName = this.companyName;
    this.activeModal.close();
    this.subscriptions.push(
      this.cartService.createQuotation(req).subscribe( response => {
        console.log("**** ++++++++  response is ", response);
        if(response && response.Accounts && response.Accounts.data && response.Accounts.data.length > 0){
          if(response.Accounts.data[0].code === 'SUCCESS'){
            this.router.navigate(['/cart/cart-submit']);
          } 
          else {
            console.log("/**** Some error occurred ****/ ");
          }
        }
        else{
          console.log("/**** Some error occurred ****/ ");
        }
        
      })
    )
  }



}
