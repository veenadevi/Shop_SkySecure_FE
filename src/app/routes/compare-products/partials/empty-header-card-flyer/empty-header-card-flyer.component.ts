import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCompareProductModalComponent } from 'src/shared/components/modals/add-compare-product-modal/add-compare-product-modal.component';

@Component({
  selector: 'empty-header-card-flyer',
  templateUrl: './empty-header-card-flyer.component.html',
  styleUrls: ['./empty-header-card-flyer.component.css']
})
export class EmptyHeaderCardFlyerComponent {

  @Input('index')
  public index : any;
  @Output() selectedProductItem = new EventEmitter();
  constructor(
    private modalService : NgbModal
  ){}

  public addProductModal() {
    const modalRef = this.modalService.open(AddCompareProductModalComponent, {size: 'lg', windowClass: 'add-compare-products-custom-class'});
    //modalRef.componentInstance.request = queryParams;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      let productJson = {
        "receivedEntry" : receivedEntry,
        "index" : this.index
      }
      this.selectedProductItem.emit(productJson);

    })
  }

}
