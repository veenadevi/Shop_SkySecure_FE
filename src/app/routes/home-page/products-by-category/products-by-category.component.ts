import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent {

  /** Constructor */
  constructor(private router: Router) {
}


  public goToProductsPage(){
    this.router.navigate(['/products']);
  }

}
