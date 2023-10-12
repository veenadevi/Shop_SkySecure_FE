import { Component , Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { SuperAdminService } from 'src/shared/services/super-admin-service/super-admin.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';


@Component({
  selector: 'app-review-detail-page',
  templateUrl: './review-detail-page.component.html',
  styleUrls: ['./review-detail-page.component.css']
})
export class ReviewDetailPageComponent {
  @Input() maxRating = 5;
  @Input() selectedRating = -0;
  @Input() selectedRating01 = -0;
  @Input() selectedRating02 = -0;
  @Input() selectedRating03 = -0;
  @Input() selectedRating04 = -0;
  @Output() ratingChanged = new EventEmitter<number>();

  myFrom: FormGroup;
  selectedUserId: number;

  public usersList: any[] = [];
  public userId: string;
  public subscription: Subscription[] = [];


  stars: number[];

  constructor(  
    private fb: FormBuilder,

    private adminPageService: AdminPageService,
    private superAdminService: SuperAdminService,
    private userAccountStore: UserAccountStore) 
    {
    this.stars = Array(this.maxRating).fill(0).map((_, index) => index + 1);

    this.myFrom = this.fb.group({
      channelPartner: [''],
      userName: ['', [Validators.required, Validators.required]],
      EmailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
  
    });
  }




  ngOnInit(): void {
    this.getUsersList();
    let userAccountdetails = this.userAccountStore.getUserDetails();
    this.userId = userAccountdetails._id;
  }

  public getUsersList() {
    this.subscription.push(
      this.adminPageService.getAllusers().subscribe(res => {

        this.usersList = res;
      })
    )
  }

  rate(rating: number) {
    this.selectedRating = rating;
    this.ratingChanged.emit(rating);
  }
  rate01(rating: number) {
    this.selectedRating01 = rating;
    this.ratingChanged.emit(rating);
  }
  rate02(rating: number) {
    this.selectedRating02 = rating;
    this.ratingChanged.emit(rating);
  }
  rate03(rating: number) {
    this.selectedRating03 = rating;
    this.ratingChanged.emit(rating);
  }
  rate04(rating: number) {
    this.selectedRating04 = rating;
    this.ratingChanged.emit(rating);
  }
}
