import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCompareProductModalComponent } from 'src/shared/components/modals/add-compare-product-modal/add-compare-product-modal.component';

@Component({
  selector: 'empty-header-card-flyer',
  templateUrl: './empty-header-card-flyer.component.html',
  styleUrls: ['./empty-header-card-flyer.component.css']
})
export class EmptyHeaderCardFlyerComponent {

  constructor(
    private modalService : NgbModal
  ){}

  public addProductModal() {
    const modalRef = this.modalService.open(AddCompareProductModalComponent);
    //modalRef.componentInstance.request = queryParams;
  }

}
