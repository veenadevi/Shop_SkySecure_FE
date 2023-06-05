import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/shared/services/user-profile.service';

@Component({
  selector: 'quotation-history',
  templateUrl: './quotation-history.component.html',
  styleUrls: ['./quotation-history.component.css']
})
export class QuotationHistoryComponent implements OnInit {

  public subscriptions : Subscription[] = [];

  public quotationList : any[] = [];

  public quotationListFlag = '';

  constructor(
    private userProfileService : UserProfileService
  ){}

  ngOnInit(): void {
    this.getQuotationHistory();
  }

  public getQuotationHistory(){
    this.subscriptions.push(
      this.userProfileService.getQuotationHistory().subscribe(res => {
        if(res.usercart.length > 0){
          this.setQuotationList(res.usercart);
        }
        

      })
    )
  }

  public setQuotationList(response){
    
    response.forEach(element => {

      element.deals.data.deals.data.forEach(data => {
        
        const result = element.userCartDetails.filter((obj) => {
          return obj.productName === data.Deal_Name;
        });
        console.log("**** ++++ Val ", result);
        if(result.length>0){ this.quotationListFlag = 'Y';
          let quoteData = {
            "name" : data.Deal_Name,
            "description" : data.Description,
            "expectedRevenue" : data.Expected_Revenue,
            "dealId" : data.id,
            "closingDate" : data.Closing_Date,
            "price" : result[0].price,
            "quantity" : result[0].quantity,
            "requestId" : element.cart_ref_id 
          }

          this.quotationList.push(quoteData);
          
        }
        
      });
      
    });
  }
}
