import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-invite-channel-partner',
  templateUrl: './invite-channel-partner.component.html',
  styleUrls: ['./invite-channel-partner.component.css']
})
export class InviteChannelPartnerComponent {


  myForm: FormGroup; 
  selectedUserId: number; 
  public addAdminOption : any = "new";
  public usersList : any[] = []; 
  public subscription: Subscription[] = [];
  public showMsg:boolean;
  public submitErrorMessage: boolean = false;
  public userId:string;
  public myChannels:any[]=[]
  
  users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ]; 


  constructor(
    private fb: FormBuilder,
    
    private adminPageService : AdminPageService,
    private superAdminService:SuperAdminService,
    private userAccountStore:UserAccountStore
  ) {
    this.myForm = this.fb.group({ 
      channelPartner:[''],
      userName: ['', [Validators.required, Validators.required]],
      EmailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }



  ngOnInit(): void { 
    this.getUsersList();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    this.userId=userAccountdetails._id;
    this.getMyChannelList();
  }


      
public radioClick(){
  

  if(this.addAdminOption === 'new'){
    this.myForm.controls['EmailId'].enable();
    this.myForm.controls['phoneNo'].enable();
  }
  else{
    if(this.usersList.length>0){
  // this.getUsersList();
    }
    else{
      this.getUsersList();
    }
    this.myForm.controls['EmailId'].setValue(null);
    this.myForm.controls['phoneNo'].setValue(null);
    this.myForm.controls['userName'].setValue(null);
    this.myForm.controls['EmailId'].disable();
    this.myForm.controls['phoneNo'].disable();
  }
}



public getMyChannelList(){

  this.subscription.push(
    this.superAdminService.getMyChannelPartnerList(this.userId).subscribe(response => {
   
      this.myChannels = response.myChannelList;
   
    })

  );

}

changeChannelList(event: any) {
    
  const selectedValue = event.target.value;
  // console.log("selectedValue  "+selectedValue)
  const categoryMap = new Map<string, any>();
  this.myChannels.forEach(category => {
    categoryMap.set(category._id.toString(), category);
  });
  const selectedCategory = categoryMap.get(selectedValue);
  // console.log("selectedCategory  "+selectedCategory._id)

  
 

}

public getUsersList(){
  this.subscription.push(
    this.adminPageService.getAllusers().subscribe(res=> {
      
      this.usersList = res;
    })
  )
}


public submitForm() {
  if (this.myForm.invalid){
    this.submitErrorMessage = true;
    console.log("_____submit form ++++ Error Messgae");
  }
  else { 
  
    console.log("_____++++ Error False");
    this.submitErrorMessage = false
  } 
}

public onDropDownChange(item){
  
  const selectedValue = item.target.value;
  console.log("selectedValue  ===",selectedValue) 
  const userMap = new Map<string, any>();
  this.usersList.forEach(user => {
    userMap.set(user._id.toString(), user);
  });
  const selecteduser = userMap.get(selectedValue);
   console.log("selecteduser  "+selecteduser._id) 
  this.myForm.controls['phoneNo'].enable();
  this.myForm.controls['EmailId'].enable();
  
  this.myForm.controls['EmailId'].setValue(selecteduser.email);
  this.myForm.controls['phoneNo'].setValue(selecteduser.mobileNumber);
  this.myForm.controls['userName'].setValue(selecteduser.firstName); 
}

}
