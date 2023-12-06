import { Component, ViewChild,Input,ElementRef} from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';


@Component({
  selector: 'request-quote-steps',
  templateUrl: './request-quote-steps.component.html',
  styleUrls: ['./request-quote-steps.component.css'],
  host: {
    'class': 'mat-stepper-horizontal',
    '[class.mat-stepper-label-position-end]': 'labelPosition == "end"',
    '[class.mat-stepper-label-position-bottom]': 'labelPosition == "bottom"',
    'aria-orientation': 'horizontal',
    'role': 'tablist',
  },
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class RequestQuoteStepsComponent {
  @Input()
  labelPosition: 'bottom' | 'end' = 'end';
  interests = [];

  @Input('appStepperPosition') position: 'top' | 'bottom';
  element: any;

  public navigation : any;
  public cartData:any;

  public reqBody : any;

  constructor(
    private router : Router,
    private elementRef: ElementRef
  ){
    this.navigation = this.router.getCurrentNavigation();
    this.element = elementRef.nativeElement;
  }

  formGroup = new FormGroup({ secondCtrl: new FormControl(''), })
  ngOnInit() {
    
    this.reqBody = this.navigation.extras.state.req;
    this.cartData=this.navigation.extras.state.cartData

  //   this.reqBody = {
  //     "userId": "64ee24b7e9e092005a675671",
  //     "createdBy": "Vignesh S",
  //     "products": [
  //         {
  //             "productId": "6509772b2940c6005be23362",
  //             "quantity": "1",
  //             "productName": "Microsoft 365 Business Basic",
  //             "price": 1302.4,
  //             "erpPrice": 1620,
  //             "discountRate": "19.60",
  //             "priceType": "Year",
  //             "distributorPrice": 0,
  //             "priceList": [
  //                 {
  //                     "Currency": "INR",
  //                     "price": 1302.4,
  //                     "priceType": "Year",
  //                     "ERPPrice": "1620.00",
  //                     "distributorPrice": "1302.00",
  //                     "discountRate": "19.60"
  //                 },
  //                 {
  //                     "Currency": "INR",
  //                     "price": 130.248,
  //                     "priceType": "Month",
  //                     "ERPPrice": "162.00",
  //                     "distributorPrice": "130.25",
  //                     "discountRate": "19.60"
  //                 }
  //             ],
  //             "itemTotal": 1302.4
  //         }
  //     ],
  //     "companyName": "",
  //     "cart_ref_id": 101064
  // }


    //console.log("+_+_+_ ", this.navigation.extras.state);
  }

  ngAfterViewInit(): void {
    if (this.position === 'bottom') {
      const header = this.element.children[0];
      const content = this.element.children[1];
      this.element.insertBefore(content, header);
    }
  }
  @ViewChild('stepper') private myStepper: MatStepper;

  public nextStep(){
    this.myStepper.next();
    //this.myStepper.selectedIndex = 2;
  }


  public gstDetailsAction(event){
    console.log("+_+_+_+_+_+_ Action", event);

    switch (event) {
      case 'next':
        this.myStepper.next();
        break;
      case 'nextOverview':
        this.myStepper.selectedIndex = 2;
        break;
    
      default:
        break;
    }
  }


  public businessDetailsAction(event){

    if(event === 'next'){
      this.myStepper.next();
    }
    else{
      this.myStepper.selectedIndex = 0;
    }
    
  }

  public overViewAction(event){
    if(event === 0){
      this.myStepper.selectedIndex = 0;
    }
    else{
      this.myStepper.selectedIndex = 1;
    }
  }


}
