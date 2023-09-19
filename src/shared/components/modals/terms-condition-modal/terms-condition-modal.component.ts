import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms-condition-modal',
  templateUrl: './terms-condition-modal.component.html',
  styleUrls: ['./terms-condition-modal.component.css']
})
export class TermsConditionModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
  ){}
  public onCancelClick(){
    this.activeModal.close();
  }
}
