import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';

@Component({
  selector: 'products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent {

  public params : any;

  public accountDetails : any;

  public subscriptions : Subscription[] = [];

  @Input('productsData')
  public productsData : any;

    tutorials: any[];
    @ViewChild('dt') table: Table;
    clonedTutorials: { [s: string]: any } = {};

  public lineItems : any;
    

  constructor(
    private route : ActivatedRoute,
    private superAdminService : SuperAdminService,
    private primengConfig: PrimeNGConfig
  ){}


  ngOnInit(): void {

    console.log("+_+_+_+_ Products Data ", this.productsData);
    this.setTableData();
   
  }


  public setTableData(){

    this.lineItems = this.productsData.line_items;
  }





  public setTableData2(){
    this.tutorials = [
      {
          title: 'Queue',
          category: 'Data Structure',
          rating: 8,
      },
      {
          title: 'Circularly LinkedList',
          category: 'Data Structure',
          rating: 1,
      },
      {
          title: 'Doubly LinkedList',
          category: 'Data Structure',
          rating: 3,
      },
      {
          title: 'Singly LinkedList',
          category: 'Data Structure',
          rating: 5,
      },
      {
          title: 'Doubly Ended Queue',
          category: 'Data Structure',
          rating: 10,
      },
      {
          title: 'Binary Search Tree',
          category: 'Data Structure',
          rating: 2,
      },
      {
          title: 'Red Black Tree',
          category: 'Data Structure',
          rating: 9,
      },
      {
          title: 'Breadth First Search',
          category: 'Graph',
          rating: 6,
      },
      {
          title: "Floyd's Cycle",
          category: 'Algorithm',
          rating: 7,
      },
      {
          title: 'Travelling Salesman Problem',
          category: 'Algorithm',
          rating: 4,
      },
      {
          title: 'Bellman Ford',
          category: 'Graph',
          rating: 8,
      },
      {
          title: 'KMP Algorithm',
          category: 'String',
          rating: 10,
      },
    ];
    this.primengConfig.ripple = true;
  }


  onRowEditInit(tutorial: any, index: number) {
      this.clonedTutorials[index] = { ...this.tutorials[index] };
  }

  onRowEditSave(tutorial: any, index: number) {
      if (tutorial.rating > 0) {
          delete this.clonedTutorials[index];
      } else {
      }
  }

  onRowEditCancel(tutorial: any, index: number) {
      this.tutorials[index] = this.clonedTutorials[index];
      delete this.clonedTutorials[index];
  }

}
