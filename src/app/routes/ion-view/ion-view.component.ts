import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';

@Component({
  selector: 'app-ion-view',
  templateUrl: './ion-view.component.html',
  styleUrls: ['./ion-view.component.css']
})
export class IonViewComponent implements OnInit{

  constructor(
    private modalService : NgbModal
  ){}

  public ngOnInit(): void {
   
  }
}
