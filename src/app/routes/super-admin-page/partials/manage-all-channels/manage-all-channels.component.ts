import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

interface AddChannelPartnerUserPayLoad {
  channelPartnerId: String,
  
  firstName: String,
  lastName: String,
  email: String,
  countryCode: String,
  mobileNumber: String,
  createdBy: String,
  updatedBy: String,
  isAdmin:Boolean



}

@Component({
  selector: 'app-manage-all-channels',
  templateUrl: './manage-all-channels.component.html',
  styleUrls: ['./manage-all-channels.component.css']
})
export class ManageAllChannelsComponent {

  addChannelPartnerUserPayLoad: AddChannelPartnerUserPayLoad;
  myForm: FormGroup;
  selectedUserId: number;
  public addAdminOption: any = "new";
  public usersList: any[] = [];
  public subscription: Subscription[] = [];
  public showMsg: boolean;
  public submitErrorMessage: boolean = false;
  public userId: string;
  public myChannels: any[] = []
  public newuserCheck:boolean=true
  public currentChannelId:string;
  public duplicate:boolean=false
  public addAsAdmin:boolean=false

  users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];


  constructor(
    private fb: FormBuilder,

    private adminPageService: AdminPageService,
    private superAdminService: SuperAdminService,
    private userAccountStore: UserAccountStore
  ) {
    this.myForm = this.fb.group({
      channelPartner: [''],
      userName: ['', [Validators.required, Validators.required]],
      EmailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      isAdmin:[''],

    });
  }



  ngOnInit(): void {
    this.getUsersList();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    this.userId = userAccountdetails._id;
    this.getMyChannelList();
  }



  public radioClick() {


    if (this.addAdminOption === 'new') {
      this.myForm.controls['EmailId'].enable();
      this.myForm.controls['phoneNo'].enable();
    }
    else {
      if (this.usersList.length > 0) {
        // this.getUsersList();
      }
      else {
        this.getUsersList();
      }
      this.myForm.controls['EmailId'].setValue(null);
      this.myForm.controls['phoneNo'].setValue(null);
      this.myForm.controls['userName'].setValue(null);

      this.myForm.controls['EmailId'].disable();
      this.myForm.controls['phoneNo'].disable();
    }
  }



  public getMyChannelList() {

    this.subscription.push(
      this.superAdminService.getAllChannelPartners().subscribe(response => {

        this.myChannels = response.channelPartners;

      })

    );

  }

  changeChannelList(event: any) {

    const selectedValue = event.target.value;
    // console.log("selectedValue  "+selectedValue)
    const cpMap = new Map<string, any>();
    this.myChannels.forEach(category => {
      cpMap.set(category._id.toString(), category);
    });
    const selectedChannelPartner = cpMap.get(selectedValue);
    console.log("selectedCategory  " + selectedChannelPartner._id)
    this.currentChannelId=selectedChannelPartner._id




  }

  public getUsersList() {
    this.subscription.push(
      this.adminPageService.getAllusers().subscribe(res => {

        this.usersList = res;
      })
    )
  }


  public submitForm() {
    if (this.myForm.invalid) {
      this.submitErrorMessage = true;
      console.log("_____submit form ++++ Error Messgae");
    }
    else {

      console.log("_____++++ Error False");
      this.submitErrorMessage = false
      this.addAsAdmin=this.myForm.get('isAdmin').value?this.myForm.get('isAdmin').value:false

      console.log("this.addAsAdmin===",this.addAsAdmin)
      this.CreateChannelPartnerUser();

      // if(this.myForm.get('isAdmin').value){
      
      //  console.log("cal to add as admin")
      // }
      // else{
      // //  this.CreateChannelPartnerUser()
      // }
    
    }
  }


  CreateChannelPartnerUser(): any {
    console.log("this.myForm.invalid=== ", this.myForm.invalid)
    let userAccountdetails = this.userAccountStore.getUserDetails();


    if (!this.myForm.valid) {

      return false;
    } else {



      var channelPartnerData = this.myForm.value;

        this.addChannelPartnerUserPayLoad = {
   
          channelPartnerId:this.currentChannelId,
          firstName:channelPartnerData.userName,
          lastName:'',
          email:channelPartnerData.EmailId,
          countryCode:"+91",
          mobileNumber:channelPartnerData.phoneNo,
          createdBy: userAccountdetails._id,
          updatedBy: userAccountdetails._id,
          isAdmin:this.addAsAdmin
       
          



      }


      this.savenewChannelPartnerUser(this.addChannelPartnerUserPayLoad)




    }
  }

  public savenewChannelPartnerUser(request:any){


    this.subscription.push(
      this.adminPageService.addChannelPartnerUsers(request).subscribe( res =>{
       
          this.showMsg=true
          this.duplicate=false
          this.myForm.reset();
       
      },
      
      (error) => {
      this.duplicate=true
      this.showMsg=false
      }
      )
    )
  }


  public onDropDownChange(item) {

    const selectedValue = item.target.value;
    console.log("selectedValue  ===", selectedValue)
    const userMap = new Map<string, any>();
    this.usersList.forEach(user => {
      userMap.set(user._id.toString(), user);
    });
    const selecteduser = userMap.get(selectedValue);
    console.log("selecteduser  " + selecteduser._id)
    this.myForm.controls['phoneNo'].enable();
    this.myForm.controls['EmailId'].enable();

    this.myForm.controls['EmailId'].setValue(selecteduser.email);
    this.myForm.controls['phoneNo'].setValue(selecteduser.mobileNumber);
    this.myForm.controls['userName'].setValue(selecteduser.firstName);
    this.newuserCheck=false

  }

}
