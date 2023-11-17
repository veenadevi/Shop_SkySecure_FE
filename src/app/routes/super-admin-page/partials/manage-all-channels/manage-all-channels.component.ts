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
  selectedChannelPartner:any;
  channelPartnerId:any;
  selectedValue:any
  public value:any
  public selectedAccountManagers: any[] = [];
  public selectedAdmin: any[] = [];
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
      phoneNo: ['', [Validators.pattern(/^\d{10}$/)]],
      isAdmin:[''],

    });
  }



  ngOnInit(): void {
    this.getUsersList();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    this.userId = userAccountdetails._id;
    console.log("this.userId",this.userId)
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
      this.superAdminService.getAllChannelPartners().subscribe(response => {

        this.myChannels = response.channelPartners;
        console.log("this.myChannels ", this.myChannels );
        // console.log("email:",this.myChannels[0].channelParterAccountManager[0].email);

      })

    );

  }
 

// public getMyChannelPartnerList(userId:any){ 
//   // console.log("running here directly" )
//   this.subscription.push( 
//   this.superAdminService.getMyChannelPartnerList(userId).subscribe( response => {
  
//     // console.log("running here directly==",response)
//     this.myChannels=response;  
//     console.log(" this.myChannels", this.myChannels )
//   })
//    )
// }


  changeChannelList(event: any) {

    const selectedValue = event.target.value;
     console.log("selectedValue  "+selectedValue)
    const cpMap = new Map<string, any>();
    this.myChannels.forEach(category => {
      cpMap.set(category._id.toString(), category);
      
    });
     this.selectedChannelPartner = cpMap.get(selectedValue);
     this.channelPartnerId=this.selectedChannelPartner._id;
   // console.log("selectedCategory" + this.selectedChannelPartner._id, )
    this.currentChannelId=this.selectedChannelPartner._id;

     this.getChannelPartnerUsers(this.channelPartnerId);
     //  console.log("this.userIdPassing",this.channelPartnerId)

       
         
  }



  // getMyChannelPartnerList(userId: any) {
  //   const selectedCategory = this.myChannels.find(category => category._id === userId);
  
  //   if (selectedCategory) {
  //     console.log("Selected Category:", selectedCategory);
  
  //     selectedCategory.channelParterAccountManager.forEach(accountManager => {
  //       console.log("Account Manager Details:", accountManager.firstName,
  //       "Account Manager Email:", accountManager.email,"Account Manager Email:", accountManager.role,
  //       "mobileNumber",accountManager.mobileNumber);
  //      this.value=accountManager
  //     });
  //   } else {
  //     console.log("Category not found for userId:", userId);
  //   }
  
  //   console.log("this.userIdPassing", this.userIdPassing);
  // }
  
  getChannelPartnerUsers(channelPartnerId: any) {
    this.selectedAccountManagers =[]
    const selectedChannel = this.myChannels.find(channel => channel._id === channelPartnerId);
  
    if (selectedChannel) {
      // console.log("Selected Category:", selectedCategory,"length",selectedCategory.length);



    
      selectedChannel.adminUsers.forEach(item => {
        item.role = "Channel Partner Admin";
      });
     
     
      

      selectedChannel.channelParterAccountManager.forEach(item => {
        item.role = "Account Manager";
      });
  
      this.selectedAccountManagers = [... selectedChannel.adminUsers, ...selectedChannel.channelParterAccountManager];

     

    
      console.log("Selected Account Managers:", this.selectedAccountManagers );
    } else {
      console.log("Category not found for channelPartnerId:", channelPartnerId);
       this.selectedAccountManagers = [];
    }
  
   
  }
  
  

 

  public getUsersList() {
    this.subscription.push(
      this.adminPageService.getAllusers().subscribe(res => {
        this.usersList = res;
        console.log("this.usersList ", this.usersList);
      })
    );
  }
   
  
  
  
  


  // getMyChannelPartnerList(item:any){ 
  //   const cpMap = new Map<string, any>();
  //   this.myChannels.forEach(category => {
  //     cpMap.set(category._id.toString(), category); 
  //     console.log("category",category)
  //     category.channelParterAccountManager.forEach(accountManager => {
  //       console.log("Account Manager Details:", accountManager);
  //       // Access specific properties from accountManager if needed
  //       console.log("Account Manager Email:", accountManager.email);
  //     });
  //   });

  //   console.log("this.userIdPassing",this.userIdPassing);
    
  // }
  // public getUsersList() {
  //   this.subscription.push(
  //     this.adminPageService.getAllusers().subscribe(res => {

  //       this.usersList = res;
  //       console.log("this.usersList ",this.usersList )
  //     })
  //   )
  // }


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
