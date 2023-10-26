import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';
import { MetadataService } from 'src/shared/services/metadata.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';


@Component({
  selector: 'app-review-detail-page',
  templateUrl: './review-detail-page.component.html',
  styleUrls: ['./review-detail-page.component.css']
})
export class ReviewDetailPageComponent {
  reviewForm: FormGroup;
  selectedUserId: number;
  productId: string;
  productName
  
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
    });
  }

  // get getFormData(): FormArray {
  //   return <FormArray>this.reviewForm.get(' reviewTitle');
  // }

//   checkInputLength(inputField) {
//     const maxLength = 15;
//     const inputValue = inputField.value;
//     const errorElement = document.getElementById("inputTextError");

//     if (inputValue.length > maxLength) {
//         errorElement.textContent = "Input text exceeds the maximum length of 15 characters.";
//     } else {
//         errorElement.textContent = ""; // Clear the error message
//     }
// }

  ngOnInit(): void {
    this.reviewPayload = this.metaDataStore.getProductReviewDetails();
    if (this.reviewPayload?.productId?.length > 2) {
      this.reviewForm.patchValue(this.reviewPayload);
      this.selectedRatings = {
        overAllRating: this.reviewPayload.overAllRating,
        featuresRating: this.reviewPayload.featuresRating,
        easyToUseRating: this.reviewPayload.easyToUseRating,
        valueOfMoneyRating: this.reviewPayload.valueOfMoneyRating,
        customerSupportRating: this.reviewPayload.customerSupportRating
      }
    }
    else {
      this.metaDataService.getProductReviewById(this.currentUrl).subscribe((data) => {
        this.reviewPayload = this.updateReviewPayload(this.reviewPayload, data.productReview);
        this.metaDataStore.setProductReviewDetails(this.reviewPayload);
        this.metaDataStore.setProductReviewOtherDetails(data.productReview);
        this.reviewForm.patchValue(data.productReview);
        this.selectedRatings = { ...data.productReview };
      }, error => {
        console.log("____TEST___ERROR", error);
      })
    }
  }

<<<<<<< Updated upstream
 // Define a variable to store the cumulative rating
// cumulativeRating: number = 0;
rate(aspect: any, star: number): void {
  this.selectedRatings[aspect.key] = star;
   console.log("____TEST RATE___", this.selectedRatings);
   console.log("customerSupportRating",this.selectedRatings[aspect.key] )
  //  this.cumulativeRating += star;
  //  console.log("____TEST RATE___ ", this.selectedRatings); 
  //  const averageRating = this.cumulativeRating / 5;
  //  console.log("Cumulative Rating:", this.cumulativeRating);
  //  console.log("Average Rating:", averageRating);
 
}

=======
  rate(aspect: any, star: number): void {
    this.selectedRatings[aspect.key] = star;
    console.log("____TEST RATE___", this.selectedRatings);
  }
  public NextErrorMessage: boolean =false;
>>>>>>> Stashed changes
  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.NextErrorMessage = false;
      // You can submit the form data here
      const formData = this.reviewForm.value;
      this.reviewPayload = {
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
        overAllRating: this.selectedRatings.overAllRating,
        featuresRating: this.selectedRatings.featuresRating,
        easyToUseRating: this.selectedRatings.easyToUseRating,
        valueOfMoneyRating: this.selectedRatings.valueOfMoneyRating,
        customerSupportRating: this.selectedRatings.customerSupportRating,
        productName:this.productName
       
      };
      console.log("productName",this,this.productName)
      console.log("____TEST____REVIEW__PAYLOAD___", this.reviewPayload);
      this.metaDataStore.setProductReviewDetails(this.reviewPayload);
      // this.router.navigate([`/review-page/review-rating-page`]);
      this.router.navigate([`/review-page/review-rating-page`], {
      queryParams: { productName: this.productName }
    });
    } else {
      console.log("___ERROR____")
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

}
