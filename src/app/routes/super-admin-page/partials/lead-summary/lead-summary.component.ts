import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lead-summary',
  templateUrl: './lead-summary.component.html',
  styleUrls: ['./lead-summary.component.css']
})
export class LeadSummaryComponent implements OnInit{

  public params : any;

  public accountDetails : any;

  constructor(
    private route : ActivatedRoute,
  ){}


  ngOnInit(): void {
    this.params = this.route.snapshot.queryParamMap;

    this.accountDetails = JSON.parse(this.params.params.account)
    console.log("_+_+_+_+_+ Params ", this.accountDetails);
  }


}
