import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-compare-product-modal',
  templateUrl: './add-compare-product-modal.component.html',
  styleUrls: ['./add-compare-product-modal.component.css']
})
export class AddCompareProductModalComponent {


  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
  ){}

  public selectedItem(event){
    this.passEntry.emit(event);
    this.activeModal.close();
  }

  public closeModal(){
    this.activeModal.close();
  }

}
