import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';

@Component({
  selector: 'add-compare-product-modal',
  templateUrl: './add-compare-product-modal.component.html',
  styleUrls: ['./add-compare-product-modal.component.css']
})
export class AddCompareProductModalComponent {


  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private toaster : ToasterNotificationService
  ){}

  public selectedItem(event){
    /*let cacheData = JSON.parse(localStorage.getItem('product_list_to_compare') || '[]');
    //let cacheData2 = JSON.parse(localStorage.getItem('product_list_to_compare2') || '[]');
    let cacheData2 = [];
    let combinedData = [...cacheData, ...cacheData2];*/

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

  public closeModal(){
    this.activeModal.close();
  }

}
