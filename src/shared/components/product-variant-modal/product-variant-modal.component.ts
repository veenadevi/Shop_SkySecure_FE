import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-variant-modal',
  templateUrl: './product-variant-modal.component.html',
  styleUrls: ['./product-variant-modal.component.css']
})
export class ProductVariantModalComponent {

  @Input() productVariant : any;

  constructor(public activeModal: NgbActiveModal) { }

  public ngOnInit() : void {
    console.log("+++++++ Varient ", this.productVariant);
  }
}
