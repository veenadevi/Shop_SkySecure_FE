import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'customer-details-estimates-table',
  templateUrl: './customer-details-estimates-table.component.html',
  styleUrls: ['./customer-details-estimates-table.component.css']
})
export class CustomerDetailsEstimatesTableComponent implements OnInit{

  @Input('customerEstimates')
  public customerEstimates : any;


  public ngOnInit(): void {
    
  }

}
