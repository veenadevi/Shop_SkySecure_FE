import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggested-compare-products',
  templateUrl: './suggested-compare-products.component.html',
  styleUrls: ['./suggested-compare-products.component.css']
})
export class SuggestedCompareProductsComponent implements OnInit{


  ngOnInit(): void {
    console.log("______ Navigated from here");
  }
}
