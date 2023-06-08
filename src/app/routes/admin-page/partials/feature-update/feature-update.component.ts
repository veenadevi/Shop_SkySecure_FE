import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';

@Component({
  selector: 'feature-update',
  templateUrl: './feature-update.component.html',
  styleUrls: ['./feature-update.component.css']
})
export class FeatureUpdateComponent {

  public name : string ;
  public description : string ;
  public subCategoryId : string ;
  public hyperLinkURL : string ;
  public createdBy : string ;
  public updatedBy : string ;

  constructor(
    private adminPageService : AdminPageService
  ){}


  public subscriptions : Subscription[] = [];

  public submitFeature() :void {

    let request = {
      "name": this.name,
      "description": this.description,
      "subCategoryId": this.subCategoryId,
      "hyperLinkURL": this.hyperLinkURL,
      "createdBy": "ADMIN",
      "updatedBy": "ADMIN"
    }  

    this.subscriptions.push(
      this.adminPageService.addFeature(request).subscribe( data => {
      })
    )
  }

}
