import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reassign-modal',
  templateUrl: './reassign-modal.component.html',
  styleUrls: ['./reassign-modal.component.css']
})
export class ReassignModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
  ){}

  public closeModal(){
    this.activeModal.close();
  }

}
