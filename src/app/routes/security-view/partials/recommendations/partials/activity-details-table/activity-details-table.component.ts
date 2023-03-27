import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RecommendationDetailsModel } from 'src/shared/models/concrete/recommendation-details.model';
import { MSUsersPoliciesService } from 'src/shared/services/microsoft-policies/ms-users-policies.service';

@Component({
  selector: 'activity-details-table',
  templateUrl: './activity-details-table.component.html',
  styleUrls: ['./activity-details-table.component.css']
})
export class ActivityDetailsTableComponent implements OnInit{


  @Input('datasource')
  public ELEMENT_DATA:any;

  @Input('activityDetailsList')
  public activityDetailsList : RecommendationDetailsModel[];

  public recomArray = [];


  public selected : any;

  public subscriptions : Subscription[] = [];

  //public ELEMENT_DATA = this.dataSource;
  /*public ELEMENT_DATA: any[] = [
    {name: 1, severity: 'Hydrogen', progress: 1.0079, assess: 'H'},
    {name: 2, severity: 'Helium', progress: 4.0026, assess: 'He'},
    {name: 3, severity: 'Lithium', progress: 6.941, assess: 'Li'},
    {name: 4, severity: 'Beryllium', progress: 9.0122, assess: 'Be'},
    {name: 5, severity: 'Boron', progress: 10.811, assess: 'B'},
    //{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    
  ];*/

// displayedColumns: string[] = ['select', 'name', 'severity', 'progress', 'assess'];
// dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
// selection = new SelectionModel<any>(true, []);

public displayedColumns: string[] = [];
public dataSource;
public selection;



constructor(
  private msUsersPoliciesService : MSUsersPoliciesService
){}

  public ngOnInit(): void {
    console.log("((((((((( ", this.activityDetailsList);
    this.setActivityListArray(this.activityDetailsList);
    this.displayedColumns= ['select', 'name', 'severity', 'progress', 'assess'];
    this.dataSource = new MatTableDataSource<any>(this.recomArray);
    this.selection = new SelectionModel<any>(true, []);
  }


  public setActivityListArray(data) {
    this.recomArray = [];

    data.forEach(element => {
      let arrayItem = {
        name: element.category, 
        severity: 'Hydrogen', 
        progress: 1.0079, 
        assess: 'H',
        details: element
      }
      this.recomArray.push(arrayItem)
    });
    
    console.log("******** Recomm Array ", this.recomArray);
    
  }


  public assess(details) {
    console.log("******** ", details);

    this.subscriptions.push(
      this.msUsersPoliciesService.msCreateConditionalPolicy(details).subscribe( res => {
        console.log("&&&& Res", res);
      })
    )
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
