import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration } from 'chart.js';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';

@Component({
  selector: 'empty-recomm-view',
  templateUrl: './empty-recomm-view.component.html',
  styleUrls: ['./empty-recomm-view.component.css']
})
export class EmptyRecommViewComponent {


      // Doughnut
      public doughnutChartLabels: string[] = [ 'Success'];
      
      public doughnutChartColors = ["#EBF8DE", "#5F6BDD"]


      //public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'];
      public doughnutChartDatasets = [
        { 
          data: [ 100], 
          backgroundColor : ["#CDCDD2"]
        },
      ];
  
      
    
      public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
        responsive: true,
        cutout: '70%'
      };

  constructor(
    private modalService : NgbModal
  ){}


  public connectToTenant(){
    this.showDialog();
  }

  public showDialog() : void {

    const modalRef = this.modalService.open(SelectOemModalComponent);
  }

}
