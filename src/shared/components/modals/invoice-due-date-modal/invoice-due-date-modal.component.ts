import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-due-date-modal',
  templateUrl: './invoice-due-date-modal.component.html',
  styleUrls: ['./invoice-due-date-modal.component.css'],
  providers: [DatePipe] ,
})
export class InvoiceDueDateModalComponent implements OnInit{

  public closingDate : Date | undefined;

  public supplyDate : Date | undefined;

  public termsList : any;

  public disableSendInvoice : boolean =  true;

  public calendarFlag : boolean = true;

  public selectedTerm : any;
  public selectedTermValue : any;

  public subscription : Subscription[] = [];

  public showInvoiceMsg: boolean;
  public currentDate:Date;

  public submitError:boolean=false

  @Input('request')
  public request : any;

  constructor(
    private cartService : CartService,
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe,
  ){
    this.termsList = [{
      "id" : "custom",
      "value" : "Custom"
    },
    {
      "id" : "net30",
      "value" : "Net 30"
    },
    {
      "id" : "net45",
      "value" : "Net 45"
    },
    {
      "id" : "net55",
      "value" : "Net 55"
    },
    {
      "id" : "net60",
      "value" : "Net 60"
    },
    ]
  }


  ngOnInit(): void {

    this.currentDate = new Date();
    
  }

  public addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  }


  public onChange(event){
    
  
    let val = event.value.id;
    this.disableSendInvoice = false;

    switch (val) {
      case 'custom':
        this.calendarFlag = false;
        this.selectedTerm = 'Custom';
        this.selectedTermValue=-1;
        return;

      case 'net30':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 30);
        this.selectedTerm = 'Net 30';
        this.selectedTermValue=30;
        return;

      case 'net45':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 45);
        this.selectedTerm = 'Net 45';
        this.selectedTermValue=45;
        return;

      case 'net55':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 55);
        this.selectedTerm = 'Net 55';
        this.selectedTermValue=55;
        return;

      case 'net60':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 60);
        this.selectedTerm = 'Net 60';
        this.selectedTermValue=60;
        return;
      

      default:
        return null;
    }

  }

  public onSubmit(){
    
    if(this.closingDate ===undefined|| this.supplyDate ===undefined){
     // console.log("error date")
      this.submitError=true
    }
    
    else{
    this.request.payment_terms_label = this.selectedTerm;

    let  formattedDueDate = this.datePipe.transform(this.closingDate, 'YYYY-MM-dd');
    this.request.due_date = formattedDueDate;

    let  formattedSupplyDate = this.datePipe.transform( this.supplyDate, 'YYYY-MM-dd');
    this.request.supplyDate =formattedSupplyDate;


    this.request.payment_terms= this.selectedTermValue

  //  console.log("due_date=====",formattedDueDate)

  //  console.log("supplyDate=====",formattedSupplyDate)

 

  console.log("error free",this.request)
  this.subscription.push(
    this.cartService.createInvoice(this.request).subscribe(res => {
      this.showInvoiceMsg = true;
      this.activeModal.close();

    })
  ) 
}
   
  }


  public closeModal(){
    this.activeModal.close();
  }
}
