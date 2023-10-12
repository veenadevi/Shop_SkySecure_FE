import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-get-reason-modal',
  templateUrl: './get-reason-modal.component.html',
  styleUrls: ['./get-reason-modal.component.css']
})
export class GetReasonModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
  ){}

  public closeModal(){
    this.activeModal.close();
  }

}
