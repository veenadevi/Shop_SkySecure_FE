import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

  constructor(
    private router : Router
  ){}

  public ngOnInit(): void {
    
  }

  public navigate(val : String){
    this.router.navigate(['/admin-page/feature-update']);
  }
}
