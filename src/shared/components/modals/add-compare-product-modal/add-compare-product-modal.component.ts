import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';

@Component({
  selector: 'add-compare-product-modal',
  templateUrl: './add-compare-product-modal.component.html',
  styleUrls: ['./add-compare-product-modal.component.css']
})
export class AddCompareProductModalComponent implements OnInit {


  @Input('request')
  public request : any;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private toaster : ToasterNotificationService
  ){}

  public headerText = "Unlock Better Choices: Compare Products Today!";

  ngOnInit(): void {
    console.log("+_+_+_+_+_+_+_+_+_+ _Val", this.request);
    if(this.request && this.request.screen === 'edit-product-in-accounts'){
      this.headerText = "Please select the Product!";
    }
  }

  public selectedItem(event){
    
    if(this.request && this.request.productLists){

      var isPresent = this.request.productLists.some(function(el){ return el._id === event._id});
      /*if(isPresent){
          
        this.toaster.showWarning("Product Already present",'')
      }
      else{
        
        this.passEntry.emit(event);
        this.activeModal.close();
      }*/
        this.passEntry.emit(event);
        this.activeModal.close();
    }
    else{
      let cachedProductsToCompare = JSON.parse(localStorage.getItem('compare_products_list') || '[]');


      var isPresent = cachedProductsToCompare.some(function(el){ return el._id === event._id});
                      
      if(isPresent){
          
          this.toaster.showWarning("Product Already present",'')
      }
      else{
        
        this.passEntry.emit(event);
        this.activeModal.close();
      }
    }

    
    
  }



  public closeModal(){
    this.activeModal.close();
  }

}
