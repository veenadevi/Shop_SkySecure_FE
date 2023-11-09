import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-gateway-response',
  templateUrl: './payment-gateway-response.component.html',
  styleUrls: ['./payment-gateway-response.component.css']
})
export class PaymentGatewayResponseComponent implements OnInit{

constructor(
  public route : ActivatedRoute,
){}

  ngOnInit(): void {

    const orderStatusId = this.route.snapshot.paramMap.get('id');

    console.log("+_+_+_ The value here is ", orderStatusId);
    
  }

}
