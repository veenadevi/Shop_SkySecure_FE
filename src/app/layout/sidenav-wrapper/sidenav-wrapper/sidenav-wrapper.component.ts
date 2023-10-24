import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { SelectOemModalComponent } from 'src/shared/components/modals/select-oem-modal/select-oem-modal.component';
import { LoginService } from 'src/shared/services/login.service';
import { DetectScrollStore } from 'src/shared/stores/detect-scroll.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.css']
})
export class SidenavWrapperComponent implements OnInit{

  public userLoggedInFlag = false;
  public userRoleVal = '';
  public userFullName = '';
  //isExpanded: boolean = false;
  isExpanded: boolean = true;

  public menuToogled: boolean = false;

  public userRolesList: any[] = ["Customer"];

  @Input() set userLoggedIn(value: any) {
    this.userLoggedInFlag = value;

  }

  @Input() set userRole(value: any) {

    this.userRoleVal = value;
    console.log("...my role ----", this.userRoleVal, value)
    //this.userRoleVal = 'superadmin'

  }

  @Input() set menuToogledVal(value: any) {
    this.menuToogled = value;
  }

  @Input() set userName(value: any) {
    this.userFullName = value;
  }
  @Input() set userRoleList(value: any) {
    console.log("fetched userrolelist====",value)
    this.userRolesList = value;
  }


  public userSubMenu: boolean = false;
  public dashboardSubMenu: boolean = false;
  public securitySubMenu: boolean = false;
  // public profileSubMenu : boolean = false;
  public adminSubMenu: boolean = false;
  public sAdminSubMenu: boolean = false;
  public amSubMenu: boolean = false;
  public cpSubMenu: boolean = false;
  public sAdmincpSubMenu:boolean=false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: NgbModal,
    private userAccountStore: UserAccountStore,
    private detectScrollStore: DetectScrollStore
  ) { }

  public userDetails$ = this.userAccountStore.userProfileDetails$
    .pipe(
      map(data => {

        if (data) {

          return data;
        }
        else {

          return null;
        }
      }
      )
    )


    ngOnInit(): void {
      this.menuToogled = false;
    }

  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  public ngAfterViewInit(): void {


    this.scrollable.elementScrolled().subscribe(scrolled => {
      //console.log('******* If scrolled', scrolled)
      this.detectScrollStore.setProductFiltersScroll();
    });


  }

  public logout() {
    //this.loginService.logout();
    //localStorage.setItem('XXXXaccess__tokenXXXX', null);
    this.menuToogled = false;
    localStorage.removeItem('XXXXaccess__tokenXXXX');
    this.userAccountStore.setUserDetails(null);
    //this.router.navigate(['']);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/']));
  }


  public menuExpansion(val, navVal) {

    //this.isExpanded = (val) ? false : true;
    this.isExpanded = true;


    if (navVal === 'security') {
      this.securitySubMenu = true;
    }
    if (navVal === 'user') {
      this.userSubMenu = true;
    }
    if (navVal === 'admin') {
      this.adminSubMenu = true;
    }
    if (navVal === 'sadmin') {
      this.sAdminSubMenu = true;
    }
    if (navVal === 'dashboard') {
      this.dashboardSubMenu = true;
    }
    if (navVal === 'am') {
      this.amSubMenu = true;
    }
    if (navVal === 'cp') {
      this.cpSubMenu = true;
    }
    if (navVal === 'sacpdmin') {
      this.sAdmincpSubMenu = true;
    }


    /*if(this.isExpanded === false){
      this.userSubMenu = false;
      this.dashboardSubMenu = false;
      this.securitySubMenu = false;
      this.profileSubMenu = false;
      this.adminSubMenu = false;
    }*/


  }

  public navAction(val, navVal) {

    switch (navVal) {
      case 'user':
        this.userSubMenu = (this.userSubMenu) ? false : true;
        this.isExpanded = this.isExpanded ? false : true;
        return;
      case 'dashboard':
        //this.dashboardSubMenu = (this.dashboardSubMenu) ? false : true;
        //this.isExpanded = this.isExpanded ? false : true;
        return;
      case 'shop':
        //this.router.navigate(['/']);
        return;
      case 'recommendations':
        //this.showDialog();
        this.router.navigate(['security-view/recommendation-default']);
        return;
      // case 'myChannelData':
      //   this.showDialog();
      //   this.router.navigate(['routes/my-channel-partner']);
      // return;

      default:
        return null;
    }
  }


  public subMenuClick(val) {





    switch (val) {
      case 'user':
        this.userSubMenu = (this.userSubMenu) ? false : true;
        return;
      case 'dashboard':
        this.dashboardSubMenu = (this.dashboardSubMenu) ? false : true;
        return;
      case 'security':
        this.securitySubMenu = (this.securitySubMenu) ? false : true;
        return;
      // case 'profile':
      //     this.profileSubMenu = (this.profileSubMenu) ? false : true;
      //     return;
      case 'admin':
        this.adminSubMenu = (this.adminSubMenu) ? false : true;
        return;

      case 'sadmin':
        this.sAdminSubMenu = (this.sAdminSubMenu) ? false : true;
        return;

      case 'sacpdmin':
          this.sAdmincpSubMenu = (this.sAdmincpSubMenu) ? false : true;
          return;

      case 'am':
        this.amSubMenu = (this.amSubMenu) ? false : true;
        return;

      case 'cp':
        this.cpSubMenu = (this.cpSubMenu) ? false : true;
        return;




      default:
        return null;
    }

  }

  public showDialog(): void {

    const modalRef = this.modalService.open(SelectOemModalComponent);
  }

  public menuToogleEvent($event) {




    this.menuToogled = this.menuToogled ? false : true;
  }


  public routeEvent(routeVal) {

    switch (routeVal) {
      case 'home':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['/']);
        return;
      case 'quotation-history':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['user-profile/quotation-history']);
        return;
      case 'amAccounts':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['account-manager/accounts']);
        return;
      case 'sadminAccounts':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['admin-pages/accounts']);
        return;
      case 'sadminMarketPlaceUser':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['admin-pages/marketplaceuser']);
        return;
      case 'sadminAssignRoles':
        this.menuToogled = false;
        this.router.navigate(['admin-pages/assign-roles']);
        return;
      case 'saddNewChannelPartner':
        this.menuToogled = false;
        this.router.navigate(['admin-pages/add-new-channel-partner']);
        return;
      case 'viewChannelPartners':
        this.menuToogled = false;
        this.router.navigate(['admin-pages/view-channel-partners-list']);
        return;
      case 'sMyCustomers':
        this.menuToogled = false;
        this.router.navigate(['admin-pages/my-customers']);
        return;

        case 'role-assignment':
        this.menuToogled = false;
        this.router.navigate(['admin-pages/role-assignment']);
        return;

        case 'managae-all-admin':
          this.menuToogled = false;
          this.router.navigate(['admin-pages/managae-all-admin']);
          return;
      case 'paFeatureUpdate':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['portal-admin-page/feature-update']);
        return;
      case 'paAddNewProduct':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['portal-admin-page/add-new-product']);
        return;
      case 'paEditProduct':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['portal-admin-page/edit-product']);
        return;
      case 'paUploadProductPrice':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['portal-admin-page/upload-product-price']);
        return;
      case 'paUploadBlog':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['portal-admin-page/updateblog']);
        return;
        case 'paCreateProductOffer':
          //this.isExpanded = false;
          this.menuToogled = false;
          this.router.navigate(['portal-admin-page/create-product-offer']);
          return;
      case 'paInviteUser':
        //this.isExpanded = false;
        this.menuToogled = false;
        this.router.navigate(['portal-admin-page/invite-user']);
        return;
      case 'cpMyChannelLeads':
        this.menuToogled = false;
        this.router.navigate(['channel-partner/mychannelLeads']);
        return;

      case 'cpMyChannelInviteUsers':
        this.menuToogled = false;
        this.router.navigate(['channel-partner/invite-channel-partner']);
        return;

        case 'myleadsFromChannel':
          this.menuToogled = false;
          this.router.navigate(['channel-partner/leadsfromMyChannel']);
          return;

          case 'manageAllChannels':
            this.menuToogled = false;
            this.router.navigate(['admin-pages/manage-all-channel']);
            return;
        

      default:
        return null;
    }

  }




}