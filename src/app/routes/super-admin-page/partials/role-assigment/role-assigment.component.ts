import { Component, OnInit } from '@angular/core';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';


interface UserRolePayload {
  role: String,
  userRoleList: Array<any>,
}


@Component({
  selector: 'app-role-assigment',
  templateUrl: './role-assigment.component.html',
  styleUrls: ['./role-assigment.component.css']
})


export class RoleAssigmentComponent implements OnInit {

  selectedRoles: { superAdmin: boolean, portalAdmin: boolean } = { superAdmin: false, portalAdmin: false };
  UserRolePayload: UserRolePayload;
  public usersList: any[] = [];
  public subscription: Subscription[] = [];
  public myChannels: any[] = []
  public submitErrorMessage: boolean = false;
  public currentChannelId: string;
  public addAsAdmin: boolean = false;
  public showMsg: boolean;
  public duplicate: boolean;
  public userId: string;
  myForm: FormGroup;
  filteredUsersList: any[];
  filteredRoles: string[] = [];
  selectedUserName:string;
  selectedUserRole: string;
  superadminChecked: boolean = false;
  portaladminChecked: boolean = false;


  constructor(
    private fb: FormBuilder,
    private adminPageService: AdminPageService,
    private superAdminService: SuperAdminService,

    private userAccountStore: UserAccountStore
  ) {
    this.myForm = this.fb.group({
      superAdmin: [false],
      portalAdmin: [false],
    })
  }

  ngOnInit(): void {

    this.getUsersList();

  }
  public submitForm() {
    // if (this.myForm.invalid) {
    //   this.submitErrorMessage = true; 
    // }
    // else { 
    //   this.submitErrorMessage = false
    //   this.addAsAdmin=this.myForm.get('isAdmin').value?this.myForm.get('isAdmin').value:false 
    // }


    let controls = this.myForm.controls
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log("_____invalid for ", name);
      }
    }
    console.log("while submit this.myForm.invalid=== ", this.myForm.invalid, this.myForm.value)
    if (this.myForm.invalid) {
      this.submitErrorMessage = true;
      console.log("_____submit form ++++ Error Messgae");
    }
    else {
      this.SelectRole()
      console.log("_____++++ Error False");
      this.submitErrorMessage = false
    }

  }
  SelectRole(): any {
    console.log("this.myForm.invalid=== ", this.myForm.invalid);
    // let userAccountdetails = this.userAccountStore.getUserDetails(); 
    if (!this.myForm.valid) { 
      return false;
    } else {
      var userRoleData = this.myForm.value;
      console.log("userRoleData", userRoleData);
      this.UserRolePayload = {
        role: this.selectedUserName,
        userRoleList: [
          {
            "superAdmin": userRoleData.superAdmin,
            "portalAdmin": userRoleData.portalAdmin
          }
        ]

      } 
      console.log(" this.UserRolePayload", this.UserRolePayload);
      console.log("this.selectedUserName",this.selectedUserName);
    }
  }
 

  public onDropDownChange(event) { 
    const selectedUser = this.usersList.find(user => user._id === event.target.value);
    
    if (selectedUser) {
      this.selectedUserName = selectedUser.firstName;
      console.log("Selected User Name:", this.selectedUserName);
    } else {
      console.log("Selected User not found in usersList.");
    }
  } 

 
  public getUsersList() {
    this.subscription.push(
      this.adminPageService.getAllusers().subscribe(res => {
        this.usersList = res;
        console.log("response-role", res);
        // this.filterRoles();
      })
    )
  }

  // onCheckboxChange() {
  //   this.filterRoles();
  // }

  // filterRoles() {
  //     this.filteredRoles = [];
  // console.log("this.flterdrole",this.filterRoles)
  //     if (this.myForm.get('superAdmin').value) {
  //       console.log(this.usersList )
  //       this.filteredRoles.push('Super Admin');
  //     }

  //     if (this.myForm.get('portalAdmin').value) {
  //       this.filteredRoles.push('Portal Admin');
  //     }


  // this.filteredRoles = []; // Clear the filteredRoles array before filtering again.

  // // Extract roles from the user data and add them to the filteredRoles array
  // this.usersList.forEach(user => {
  //   if (user.role === 'Super Admin' && this.myForm.get('superAdmin').value) {
  //     this.filteredRoles.push(user.role);
  //     console.log(user.role,"user.role" )
  //   } else if (user.role === 'Portal Admin' && this.myForm.get('portalAdmin').value) {
  //     this.filteredRoles.push(user.role);
  //   }
  //   // Add more conditions for other roles as needed
  // });

  // // Now you can use this.filteredRoles for any further processing or display.
  // console.log("Filtered Roles", this.filteredRoles);
  //   }




  // const superAdminChecked = this.myForm.get('superAdmin').value;
  // const portalAdminChecked = this.myForm.get('portalAdmin').value; 
  // this.filteredUsersList = this.usersList.filter(user => {
  //   const isSuperAdmin = user.role === 'superAdmin' && superAdminChecked;
  //   const isPortalAdmin = user.role === 'portalAdmin' && portalAdminChecked;



  //   return isSuperAdmin || isPortalAdmin;  
  // });


  // console.log("Filtered Users", this.filteredUsersList);
  //   }
}
