import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit{
  @Input() similarProducts : Array<any> = [];
  public products = [];
  
  ngOnInit(): void {
    this.similarProducts.forEach((data) =>  {
       this.products.push({ name : data.name , _id : data._id, description: data.description , isBundle : true})
       data.otherProducts.forEach((item) => {
        this.products.push(item);
       })
    })
  }
}
