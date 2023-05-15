import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';

@Component({
  selector: 'app-licence-catalogue',
  templateUrl: './licence-catalogue.component.html',
  styleUrls: ['./licence-catalogue.component.css']
})
export class LicenceCatalogueComponent implements OnInit{

  constructor(
    private modalService : NgbModal
  ){}

  public ngOnInit(): void {
    const modalRef = this.modalService.open(SelectOemModalComponent);
  }
}
