import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-invoice-due-date-modal',
  templateUrl: './invoice-due-date-modal.component.html',
  styleUrls: ['./invoice-due-date-modal.component.css']
})
export class InvoiceDueDateModalComponent implements OnInit{

  public closingDate : Date | undefined;

  public termsList : any;

  public disableSendInvoice : boolean =  true;

  public calendarFlag : boolean = true;

  public selectedTerm : any;

  public subscription : Subscription[] = [];

  public showInvoiceMsg: boolean;

  @Input('request')
  public request : any;

  constructor(
    private cartService : CartService,
    public activeModal: NgbActiveModal,
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
        return;

      case 'net30':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 30);
        this.selectedTerm = 'Net 30';
        return;

      case 'net45':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 45);
        this.selectedTerm = 'Net 45';
        return;

      case 'net55':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 55);
        this.selectedTerm = 'Net 55';
        return;

      case 'net60':
        this.calendarFlag = true;
        this.closingDate = this.addDays(new Date(), 60);
        this.selectedTerm = 'Net 60';
        return;
      

      default:
        return null;
    }

  }

  public onSubmit(){
    
    this.request.term = this.selectedTerm;
    this.request.endDate = this.closingDate;
    

    this.subscription.push(
      this.cartService.createInvoice(this.request).subscribe(res => {
        this.showInvoiceMsg = true;
        this.activeModal.close();

      })
    ) 
  }

}
