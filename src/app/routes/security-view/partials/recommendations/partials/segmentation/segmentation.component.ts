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
    public doughnutChartLabels: string[] = [ 'Success', 'Not Configured'];
    // public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    //     { data: [ 350, 450], label: 'Series A' },
    //   ];

    public doughnutChartColors = ["#EBF8DE", "#5F6BDD"]
    public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'];

    
  
    public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: true,
      cutout: '70%'
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
      if(this.segmentationsList && this.segmentationsList.segmentations.length> 0){
        console.log("**** Inside ", this.segmentationsList);
        this.selectedSegmentation(this.segmentationsList.segmentations[0]);
      }
      

      //this.dataSource.paginator = this.paginator;
    }

    public selectedSegmentation (segmentation) {

      this.subscriptions.push(
        this.microsoftFraphService.getRecommendationsList(segmentation._id).subscribe(data => {
          console.log("****** %%%%% Data in last ", data);
          this.activityDetailsList = data.recommandations;
          this.selected = segmentation.name;
          this.setGraphData(data.recommandations);
        })
        );
      
    }

    public setGraphData(recomList){
      console.log("******^^^^^^^^^ Recom List", recomList);
      let total = recomList.length;
      //let successData =  recomList.filter( event => (event.userConfigStatus[0].status === 'Success'));
      let successData =  recomList.filter( event => {
        if(event.userConfigStatus && event.userConfigStatus.length > 0){
          if(event.userConfigStatus[0].status === 'Success'){
            return event;
          }
        }
      }
        );
      let successLength = successData.length;
      this.doughnutChartDatasets = [
        { 
          data: [ successLength, total-successLength], 
          backgroundColor : ["#25BC9D", "#5F6BDD"]
        },
      ];
      /*public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
        beforeDraw(chart) {
          const ctx = chart.ctx;
          const txt = 'Center Text';
    
          //Get options from the center object in options
          const sidePadding = 60;
          const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
    
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
    
          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          const stringWidth = ctx.measureText(txt).width;
          const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
    
          // Find out how much the font can grow in width.
          const widthRatio = elementWidth / stringWidth;
          const newFontSize = Math.floor(30 * widthRatio);
          const elementHeight = (chart.innerRadius * 2);
    
          // Pick a new font size so it will not be larger than the height of label.
          const fontSizeToUse = Math.min(newFontSize, elementHeight);
    
          ctx.font = fontSizeToUse + 'px Arial';
          ctx.fillStyle = 'blue';
    
          // Draw text in center
          ctx.fillText('Center Text', centerX, centerY);
        }
      }];*/
      
    }

}
