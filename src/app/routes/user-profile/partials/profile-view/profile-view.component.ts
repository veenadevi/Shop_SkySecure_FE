import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { UserProfileService } from 'src/shared/services/user-profile.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit{


 

  public userDetails : any;

  public edit = true;

  public subscriptions : Subscription[] = [];

  constructor(
    private userAccountStore : UserAccountStore,
    private userProfileService : UserProfileService

  ){};


  public userDetails$ = this.userAccountStore.userProfileDetails$
  .pipe(
    map(data => {
      
      if(data){
        this.userDetails = data.userDetails;
        // console.log("++++++++++ Came inside User", this.userDetails);
        return data;
      }
      else{
        
        return null;
      }
    }
    )
  )

  ngOnInit(): void {
    
  }


  onSubmit(formValue) {
    // console.log(formValue);
  }

  public updateProfile(){
    // console.log("***** Updated Data ", this.userDetails);

    let req = {
      "firstName": this.userDetails.firstName,
      "company" : this.userDetails.company,
      "lastName" : this.userDetails.lastName,
      "email" : this.userDetails.email,
      "createdBy": this.userDetails.createdBy,
      "updatedBy": this.userDetails.updatedBy,
      "createdAt": this.userDetails.createdAt,
      "updatedAt": this.userDetails.updatedAt,
      "role": this.userDetails.role,
      "address": this.userDetails.address,
      "countryCode": this.userDetails.countryCode,
      "mobileNumber": this.userDetails.mobileNumber
    }

    this.subscriptions.push(
      this.userProfileService.updateUserProfile(req).subscribe( response => {
        // console.log("***** ++++++ Updated ", response);
        this.edit = true;
      })
    )
  }

  public editClick(val) : void {

    this.edit = val;
    
    // if(val === 'true'){
    //   this.edit = true;
    // }
    // else{
    //   this.edit = false;
    // }
  }

}
