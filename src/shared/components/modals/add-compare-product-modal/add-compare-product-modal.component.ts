import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'add-compare-product-modal',
  templateUrl: './add-compare-product-modal.component.html',
  styleUrls: ['./add-compare-product-modal.component.css']
})
export class AddCompareProductModalComponent implements OnInit {
  public productLogo: string;

 
  showCompareProductModal: boolean = false;
  showUploadPoModal: boolean = false;
  dataForModal: any;
  modalType: string;

  @Input('request')  public request : any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private toaster : ToasterNotificationService,
    private http: HttpClient,
  ){}

  public headerText = "Unlock Better Choices: Compare Products Today!";

  ngOnInit(): void {
    console.log("+_+_+_+_+_+_+_+_+_+ _Val", this.request);
    if(this.request && this.request.screen === 'edit-product-in-accounts'){
      this.headerText = "Please select the Product!";
    } 
    // if (this.modalType === 'compare') {
    //   this.headerText = 'Unlock Better Choices: Compare Products Today!';
    //   this.showCompareProductModal = true;
    //   this.showUploadPoModal = false;
    //   console.log("IN If modal type")
    // } else if (this.modalType === 'upload') {
    //   this.headerText = 'Upload PO';
    //   this.showCompareProductModal = false;
    //   this.showUploadPoModal = true;
    //   console.log("IN else  modal type")
    // }
  }

  // openModal(modalType: 'compare' | 'upload') {
  //   console.log(`Opening modal: ${modalType}`);
  //   if (modalType === 'compare') {
  //     this.headerText = 'Unlock Better Choices: Compare Products Today!';
  //     this.showCompareProductModal = true;
  //     this.showUploadPoModal = false;
  //   } else if (modalType === 'upload') {
  //     this.headerText = 'Upload PO';
  //     this.showCompareProductModal = false;
  //     this.showUploadPoModal = true;
  //   }
  // }




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


  uploadFile(event: any) {
    
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          
          this.productLogo = response.filePath;
          // Handle the response from the server
        },
        error => {
          console.error('Upload error:', error);
          // Handle the error response
        }
      );
  }

}
