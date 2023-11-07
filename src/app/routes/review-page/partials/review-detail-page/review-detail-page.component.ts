import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { map,Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { MetadataService } from 'src/shared/services/metadata.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
 

@Component({
  selector: 'app-review-detail-page',
  templateUrl: './review-detail-page.component.html',
  styleUrls: ['./review-detail-page.component.css']
})
export class ReviewDetailPageComponent {
  reviewForm: FormGroup;
  selectedUserId: number;
  productId: string;
  productName:string;

  isFromSecondPage:boolean=false;
  
  public usersList: any[] = [];
  public userId: string;
  public subscription: Subscription[] = [];
  public currentUrl: string;
  stars: number[] = [1, 2, 3, 4, 5];
  reviewPayload = {
    productId: '',
    userName: '',
    email: '',
    organizationName: '',
    jobTitle: '',
    companySize: '',
    softwareUsageDuration: '',
    reviewTitle: '',
    reviewContent: '',
    agreeTermsAndConditions: false,
    overAllRating: 0,
    featuresRating: 0,
    easyToUseRating: 0,
    valueOfMoneyRating: 0,
    customerSupportRating: 0,
    productName:''
  };

  selectedRatings: { [key: string]: number } = {
    overAllRating: 0,
    featuresRating: 0,
    easyToUseRating: 0,
    valueOfMoneyRating: 0,
    customerSupportRating: 0
  };

  aspectList = [
    { name: 'Overall Rating', key: 'overAllRating', rating: 0 },
    { name: 'Features', key: 'featuresRating', rating: 0 },
    { name: 'Ease of Use', key: 'easyToUseRating', rating: 0 },
    { name: 'Value of Money', key: 'valueOfMoneyRating', rating: 0 },
    { name: 'Customer Support', key: 'customerSupportRating', rating: 0 }
  ];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private metaDataStore: MetadataStore,
    private metaDataService: MetadataService,
    private userAccountStore : UserAccountStore,
    ) {

    this.reviewForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      organizationName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      companySize: ['', Validators.required],
      softwareUsageDuration: ['', Validators.required],
      reviewTitle: ['', Validators.required, ],
      reviewContent: ['', Validators.required],
      agreeTermsAndConditions: [false, Validators.requiredTrue],
       
      
    });

    this.router.events.subscribe((event: Event) => {
      this.currentUrl = this.route.snapshot.paramMap.get('id');

      if (event instanceof NavigationStart) {
        this.currentUrl = this.route.snapshot.paramMap.get('id');
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl = this.route.snapshot.paramMap.get('id');
        this.ngOnInit();
      }

      if (event instanceof NavigationError) {
      }
    });
    this.route.queryParams.subscribe(params => {
      this.productId = params.productId;
      this.productName = params.productName;
      this.isFromSecondPage=params.isFromSecondPage
    });
    this.aspectList.forEach((aspect) => {
      this.reviewForm .addControl(aspect.key, this.fb.control('', Validators.required));
    });
  }



  ngOnInit(): void { 

    /**
     * no need to set old data - w
     */
  
   
    //  this.reviewPayload = this.metaDataStore.getProductReviewDetails();

    //  console.log("on init what is ===",this.reviewPayload)
    //  //("OnInit",this.reviewPayload)
    // if (this.reviewPayload?.productId?.length > 2) {
    //   this.reviewForm.patchValue(this.reviewPayload);
    //   this.selectedRatings = {
    //     overAllRating: this.reviewPayload.overAllRating,
    //     featuresRating: this.reviewPayload.featuresRating,
    //     easyToUseRating: this.reviewPayload.easyToUseRating,
    //     valueOfMoneyRating: this.reviewPayload.valueOfMoneyRating,
    //     customerSupportRating: this.reviewPayload.customerSupportRating
    //   }
    // }
    // else {
      
    // }
    if(this.isFromSecondPage){
      this.setPreviousRecords()
    }
   

    this.setSelfData();
    
  }
  setPreviousRecords(){

    this.reviewPayload = this.metaDataStore.getProductReviewDetails();


    console.log("review payload ====on click previous ",this.reviewPayload,"setting con trolvaluye" ,this.reviewPayload.reviewTitle)
    this.reviewForm.get('reviewTitle').setValue(this.reviewPayload.reviewTitle.length>0 ? this.reviewPayload.reviewTitle : 'veena');  
    this.reviewForm.get('reviewContent').setValue(this.reviewPayload?.reviewContent.length>0 ? this.reviewPayload?.reviewContent : 've');  
    this.reviewForm.patchValue(this.reviewPayload);
    this.text01=this.reviewPayload.reviewTitle;
    this.text=this.reviewPayload.reviewContent;
    if (this.reviewPayload?.productId?.length > 2) {
   
        this.selectedRatings = {
         overAllRating: this.reviewPayload.overAllRating,
          featuresRating: this.reviewPayload.featuresRating,
          easyToUseRating: this.reviewPayload.easyToUseRating,
           valueOfMoneyRating: this.reviewPayload.valueOfMoneyRating,
          customerSupportRating: this.reviewPayload.customerSupportRating
         }

        
  }
}


 // Define a variable to store the cumulative rating
// cumulativeRating: number = 0;

rate(aspect: any, star: number): void {
  this.selectedRatings[aspect.key] = star;
  // Update the form control with the new star rating value
   this.reviewForm.controls[aspect.key].setValue(star);
  console.log("this.selectedRatings[aspect.key]",this.selectedRatings[aspect.key])
}


  public NextErrorMessage: boolean =false;
  onSubmit(): void {
    console.log("ON SUBMIT",this.reviewForm.value)
    if (this.reviewForm.valid) {
      this.NextErrorMessage = false;
  
      // You can submit the form data here
      const formData = this.reviewForm.value;
  
      // The form controls should now contain the updated selectedRatings values
      const reviewPayload = {
        productId: this.currentUrl,
        userName: formData.userName,
        email: formData.email,
        organizationName: formData.organizationName,
        jobTitle: formData.jobTitle,
        companySize: formData.companySize,
        softwareUsageDuration: formData.softwareUsageDuration,
        reviewTitle: formData.reviewTitle,
        reviewContent: formData.reviewContent,
        agreeTermsAndConditions: formData.agreeTermsAndConditions,
        overAllRating: formData.overAllRating,
        featuresRating: formData.featuresRating,
        easyToUseRating: formData.easyToUseRating,
        valueOfMoneyRating: formData.valueOfMoneyRating,
        customerSupportRating: formData.customerSupportRating,
        productName: this.productName
      };
  
      this.metaDataStore.setProductReviewDetails(reviewPayload);
    console.log("reviewPayload",reviewPayload)
      this.router.navigate([`/review-page/review-rating-page`], {
        queryParams: { productName: this.productName }
      });
    } else {
      this.NextErrorMessage = true;
      // Handle form validation errors or show a message to the user
    }
  }

  // disableErrorMessage(){
  //   if(this.reviewForm.value === true){
  //     this.NextErrorMessage=false;
  //   }
  // }
  updateReviewPayload(payload, providedObject): any {
    for (const key in payload) {
      if (providedObject.hasOwnProperty(key)) {
        payload[key] = providedObject[key];
      }
    }
    return payload;
  }

  text: string = '';
  characterCount: number = 0;

  countCharacters() {
    console.log("gettign called to type ===content")
    this.characterCount = this.text.length;
  }
  text01: string = '';
  characterCount01: number = 0;
  countCharacters01() {
    console.log("gettign called to type ===title")
    this.characterCount01 = this.text01.length;
  }


 
  setSelfData(){
    let userDetails = this.userAccountStore.getUserDetails();
   // console.log("userDetails-GST ",userDetails.name,"",userDetails.email,"",userDetails.company )  
    this.reviewForm.controls['userName'].setValue(userDetails.firstName ? userDetails.firstName : null);
    this.reviewForm.controls['email'].setValue(userDetails.email ? userDetails.email : null);
    this.reviewForm.controls['organizationName'].setValue(userDetails.company ? userDetails.company : null);
    
  }
  
  
}
