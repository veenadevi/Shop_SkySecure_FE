import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-payment-gateway-response',
  templateUrl: './payment-gateway-response.component.html',
  styleUrls: ['./payment-gateway-response.component.css']
})
export class PaymentGatewayResponseComponent implements OnInit{


  public subscription : Subscription[] = [];
  public statusResponse : any;



constructor(
  public route : ActivatedRoute,
  public cartService : CartService,
  private spinner: NgxSpinnerService
){}

  ngOnInit(): void {

    let orderStatusId = this.route.snapshot.paramMap.get('id');
    //let orderStatusId = '654c842732b0f57bddc2c484';
   // console.log("+_+_+_ The value here is ", orderStatusId);

    this.spinner.show();
    this.getStatusUpdate(orderStatusId);

    //654c842732b0f57bddc2c484
    
  }

  public getStatusUpdate(id){
    this.subscription.push(
      this.cartService.getPaymentStatusUpdate(id).subscribe(res=>{
       // console.log("+_+_+_ Final Update ", res);
        this.statusResponse = res;
        this.spinner.hide();
      })
    )
  }

}
