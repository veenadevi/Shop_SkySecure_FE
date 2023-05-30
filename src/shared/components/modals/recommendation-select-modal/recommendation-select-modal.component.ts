import { Component } from '@angular/core';

@Component({
  selector: 'recommendation-select-modal',
  templateUrl: './recommendation-select-modal.component.html',
  styleUrls: ['./recommendation-select-modal.component.css']
})
export class RecommendationSelectModalComponent {
  cities: any[];

  selectedCity: any;

  visible: boolean;


  ngOnInit() { 
    console.log("** CAme inside Recom");
    this.visible = true;
      this.cities = [
          {name: 'New York', code: 'NY'},
          {name: 'Rome', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
      ];
  }

  showDialog() {
      this.visible = true;
  }
}
