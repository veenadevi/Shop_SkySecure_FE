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
  selector: 'app-invite-channel-partner',
  templateUrl: './invite-channel-partner.component.html',
  styleUrls: ['./invite-channel-partner.component.css']
})



export class InviteChannelPartnerComponent {


  addChannelPartnerUserPayLoad: AddChannelPartnerUserPayLoad;
  myForm: FormGroup
  CPError:boolean=false
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
  public selectedAccountManagers: any[] = [];
  selectedValue:any;
  channelPartnerId:String='';
  selectedChannelPartner:any;
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
      EmailId: ['', [ Validators.email]],
      phoneNo: ['', [Validators.pattern(/^\d{10}$/)]],
      isAdmin:[''],

    });
  }



  ngOnInit(): void {
    this.getUsersList();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    this.userId = userAccountdetails._id;
    this.getMyChannelList();
    this.getChannelPartnerUsers(this.selectedValue);
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
      this.superAdminService.getMyChannelPartnerList(this.userId).subscribe(response => {

        this.myChannels = response.myChannelList;

      })

    );

  }

  public changeChannelList(event: any) {

    const selectedValue = event.target.value;
    // console.log("selectedValue  "+selectedValue)
    const cpMap = new Map<string, any>();
    this.myChannels.forEach(category => {
      cpMap.set(category._id.toString(), category);
    });
    this.selectedChannelPartner = cpMap.get(selectedValue);
    console.log("selectedCategory  " , this.selectedChannelPartner._id)
    this.channelPartnerId=this.selectedChannelPartner._id;
    this.getChannelPartnerUsers(this.channelPartnerId);
    console.log("this.channelPartnerId= ",this.channelPartnerId)



  }
 
  getChannelPartnerUsers(channelPartnerId: any) {
    this.selectedAccountManagers =[]
    
    const selectedChannel = this.myChannels.find(channel => channel._id === channelPartnerId);
   
    console.log(this.myChannels,"this.myChannels") 
   
    if (selectedChannel) { 
      selectedChannel.adminUsers.forEach(item => {
        item.role = "Channel Partner Admin";
      }); 

      selectedChannel.channelParterAccountManager.forEach(item => {
        item.role = "Account Manager";
      });
  
      this.selectedAccountManagers = [... selectedChannel.adminUsers, ...selectedChannel.channelParterAccountManager];
  
    } else {
   
       this.selectedAccountManagers = [];
    }
  }
 
  public getUsersList() {
    this.subscription.push(
      this.adminPageService.getAllusers().subscribe(res => {

        this.usersList = res;
      })
    )
  }

 
  
  public submitForm() {

    if( this.channelPartnerId.length<=0){
      this.CPError=true
      //console.log('chennal error ')
      return;
    }
    
    if (this.myForm.invalid) {
      this.submitErrorMessage = true;
      //console.log("_____submit form ++++ Error Messgae");
    }
    else {

     // console.log("_____++++ Error False");
      this.submitErrorMessage = false
      this.addAsAdmin=this.myForm.get('isAdmin').value?this.myForm.get('isAdmin').value:false

    //  console.log("this.addAsAdmin===",this.addAsAdmin)
      this.CreateChannelPartnerUser();

      
    
    }
  }


  CreateChannelPartnerUser(): any {
   // console.log("this.myForm.invalid=== ", this.myForm.invalid)
    let userAccountdetails = this.userAccountStore.getUserDetails();


    if (!this.myForm.valid) {

      return false;
    } else {



      var channelPartnerData = this.myForm.value;

        this.addChannelPartnerUserPayLoad = {
   
          channelPartnerId:this.channelPartnerId,
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
          location.reload();
       
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
    //console.log("selectedValue  ===", selectedValue)
    const userMap = new Map<string, any>();
    this.usersList.forEach(user => {
      userMap.set(user._id.toString(), user);
    });
    const selecteduser = userMap.get(selectedValue);
   // console.log("selecteduser  " + selecteduser._id)
    this.myForm.controls['phoneNo'].enable();
    this.myForm.controls['EmailId'].enable();

    this.myForm.controls['EmailId'].setValue(selecteduser.email);
    this.myForm.controls['phoneNo'].setValue(selecteduser.mobileNumber);
    this.myForm.controls['userName'].setValue(selecteduser.firstName);
    this.newuserCheck=false

  }

  
}
