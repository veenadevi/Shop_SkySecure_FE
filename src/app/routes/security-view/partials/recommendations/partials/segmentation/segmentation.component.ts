import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { RecommendationDetailsModel } from 'src/shared/models/concrete/recommendation-details.model';
import { MicrosoftGraphService } from 'src/shared/services/microsoft-graph.service';

@Component({
  selector: 'segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.css']
})
export class SegmentationComponent implements OnInit{


  @Input('segmentationsList')
  public segmentationsList: any;

  public activityDetailsList : RecommendationDetailsModel[] = [];

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
      {name: 1, severity: 'Hydrogen', progress: 1.0079, assess: 'H'},
      {name: 2, severity: 'Helium', progress: 4.0026, assess: 'He'},
      {name: 3, severity: 'Lithium', progress: 6.941, assess: 'Li'},
      {name: 4, severity: 'Beryllium', progress: 9.0122, assess: 'Be'},
      {name: 5, severity: 'Boron', progress: 10.811, assess: 'B'},
      //{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      
    ];

  displayedColumns: string[] = ['select', 'name', 'severity', 'progress', 'assess'];
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
          this.activityDetailsList = data.recommandations;
          this.selected = segmentation.name;
        })
        );
      
    }



}
