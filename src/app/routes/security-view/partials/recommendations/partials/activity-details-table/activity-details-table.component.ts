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

  public isCompleted : boolean = false;

  public selected : any;

  public subscriptions : Subscription[] = [];

  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];

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
    this.setActivityListArray(this.activityDetailsList);
    this.displayedColumns= ['select', 'name', 'severity', 'progress', 'assess'];
    this.dataSource = new MatTableDataSource<any>(this.recomArray);
    this.selection = new SelectionModel<any>(true, []);
  }


  public setActivityListArray(data) {
    this.recomArray = [];

    data.forEach(element => {
      this.activityDetailsList[element]
      // let arrayItem = {
      //   name: element.category, 
      //   severity: 'Hydrogen', 
      //   progress: 1.0079, 
      //   assess: 'H',
      //   details: element
      // }
      // this.recomArray.push(arrayItem)
    });

    /*this.activityDetailsList.forEach(ele => {
      ele['isCompleted'] = false;
      if(ele.apiData && ele.apiData.body){
        console.log("***** False");
        ele['checkBox'] = false;
      }
      else {
        console.log("***** True");
        ele['checkBox'] = true;
      }
    })*/
    
  }


  public assess(details) {
    // console.log("******** ", details);

    this.isCompleted = true;
    details.isCompleted = true;
    this.subscriptions.push(
      
      this.msUsersPoliciesService.msCreateConditionalPolicy(details).subscribe( res => {
  
        this.isCompleted = false;
        details.isCompleted = false;
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

  checkAllCheckBox(ev: any) { // Angular 13
		//this.products.forEach(x => x.checked = ev.target.checked)
    this.recomArray.forEach(x => x.checked = ev.target.checked);
	}

	isAllCheckBoxChecked() {
		//return this.products.every(p => p.checked);
    return this.recomArray.every(p => p.checked);
	}

  public autoConfigureSelected() : void {
    
    let filteredArray =  this.activityDetailsList.filter( event => (event.checked));
  

    filteredArray.forEach(details => {
      this.isCompleted = true;
      details.isCompleted = true;
      details['errorMsg'] = "";



      if(details.apiData && details.apiData.method){
        if(details.apiData.method === 'POST'){
          details.errorMsg = null;
          this.subscriptions.push(
            this.msUsersPoliciesService.msGraphPolicyServicePostCall(details).subscribe( res => {
              this.isCompleted = false;
              details.isCompleted = false;
            })
          )
        }
        else if(details.apiData.method === 'GET'){
          details.errorMsg = null;
          this.subscriptions.push(
            this.msUsersPoliciesService.msGraphPolicyServiceGetCall(details).subscribe( res => {
              this.isCompleted = false;
              details.isCompleted = false;
            })
          )
        }
        else{
          this.isCompleted = false;
          details.isCompleted = false;
          details.errorMsg = 'No Method Specified';
        }
      }
      else{
        this.isCompleted = false;
        details.isCompleted = false;
        details.errorMsg = 'Some error Occurred';
      }




      /*this.subscriptions.push(

        this.msUsersPoliciesService.msGraphPolicyServicePostCall(details).subscribe( res => {


            this.isCompleted = false;
            details.isCompleted = false;
        })
        
        //this.msUsersPoliciesService.msCreateConditionalPolicy(details).subscribe( res => {
         
          //this.isCompleted = false;
          //details.isCompleted = false;
        //})
      )*/
    });
  }

}
