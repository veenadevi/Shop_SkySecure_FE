import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {



  //** Input Variables */
  @Input('imageSrc')
  public imageSrc : string;

  @Input('name')
  public name : string;


  public ngOnInit() : void {
    
    if(!this.imageSrc){
      this.imageSrc = "/assets/icons/Archieve.svg"
    }
  }

}
