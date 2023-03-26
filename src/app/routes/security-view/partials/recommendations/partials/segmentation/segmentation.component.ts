import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { MicrosoftGraphService } from 'src/shared/services/microsoft-graph.service';

@Component({
  selector: 'segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.css']
})
export class SegmentationComponent implements OnInit{


  @Input('segmentationsList')
  public segmentationsList: any;

  public subscriptions : Subscription[] = [];

  public selected : any;

    // Doughnut
    public doughnutChartLabels: string[] = [ 'Download Sales'];
    public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
        { data: [ 350, 450], label: 'Series A' },
      ];
  
    public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: false
    };


    public ELEMENT_DATA: any[] = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      
    ];

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);


    constructor(
      private microsoftFraphService : MicrosoftGraphService
    ){}

    public ngOnInit(): void {
      console.log("***** Value at last ", this.segmentationsList);

      //this.dataSource.paginator = this.paginator;
    }

    public selectedSegmentation (segmentation) {

      this.subscriptions.push(
        this.microsoftFraphService.getRecommendationsList(segmentation._id).subscribe(data => {
          console.log("****** %%%%% Data in last ", data);
          this.selected = segmentation.name;
        })
        );
      
    }




    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }


}
