import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-rating-page',
  templateUrl: './review-rating-page.component.html',
  styleUrls: ['./review-rating-page.component.css']
})
export class ReviewRatingPageComponent  {
   reviewForm: FormGroup;

  productName
    productReviewDetails: {
     
      frequentSoftwareUsage: "",
      role: "I am a user",
      pros: "",
      cons: "",
      productRecommendRate: 7,
      salesAndSupportRate: 7,
      otherProductExperience: "",
      missingFeature: "",
      approvalStatus: 1,
      isActive: true,
      roles: {
          user: false,
          administrator: false,
          implementationTeam: false,
          selector: false,
          reseller: false
      }
    };
    role =  "";
    roleLabels: { [key: string]: string } = {
      user: 'I am a user',
      administrator: 'I am the administrator',
      implementationTeam: 'I am on the team that set up, implemented, or customized this product',
      selector: 'I helped select or purchase this product',
      reseller: 'I am a reseller',
    };

    constructor( private fb: FormBuilder, private metaDataStore: MetadataStore, private router: Router,
      private route: ActivatedRoute,) {
      this.reviewForm = this.fb.group({
        frequentSoftwareUsage: ['', Validators.required],
        roles: this.fb.group({
          user: true,
          administrator: false,
          implementationTeam: false,
          selector: false,
          reseller: false
        }),
        pros: ['', Validators.required],
        cons: ['', Validators.required],
        productRecommendRate: [9, Validators.required],
        salesAndSupportRate: [9, Validators.required],
        otherProductExperience: ['', Validators.required],
        missingFeature: ['', Validators.required]
      });
      this.productReviewDetails = this.metaDataStore.getProductReviewDetails();
      console.log(" this.productReviewDetails---", this.productReviewDetails)
    //  this.productName=this.productReviewDetails
    //  console.log(" ----productName---", this.productName)
    }


    ngOnInit(): void {
      this.productReviewDetails = this.metaDataStore.getProductReviewOtherDetails();
      console.log("this.productreview-NAME ", this.productName=this.metaDataStore.getProductReviewDetails().productName)
      if (this.productReviewDetails.frequentSoftwareUsage?.length > 2) {
        const roleControl = this.reviewForm.get('role');
        if (roleControl) {
          roleControl.setValue({
            user: this.role === 'I am a user',
            administrator: this.role === 'I am the administrator',
            implementationTeam: this.role === 'I am on the team that set up, implemented, or customized this product',
            selector: this.role === 'I helped select or purchase this product',
            reseller: this.role === 'I am a reseller',
          });
        }
        this.productReviewDetails.roles = {
            user: false,
            administrator: false,
            implementationTeam: false,
            selector: false,
            reseller: false
        }
        
        this.reviewForm.patchValue(this.productReviewDetails);
      }
    }

    onSubmit(): void {
      if (this.reviewForm.valid) {
        const formData = this.reviewForm.value;
        this.updateRoles();
        this.productReviewDetails = {
          frequentSoftwareUsage: formData.frequentSoftwareUsage,
          role: "I am a user",
          pros: formData.pros,
          cons: formData.cons,
          productRecommendRate: formData.productRecommendRate,
          salesAndSupportRate: formData.salesAndSupportRate,
          otherProductExperience: formData.otherProductExperience,
          missingFeature: formData.missingFeature,
          approvalStatus: 1,
          isActive: true,
          roles: {
            user: false,
            administrator: false,
            implementationTeam: false,
            selector: false,
            reseller: false
        }
        };
        this.metaDataStore.setProductReviewOtherDetails(this.productReviewDetails);
        this.router.navigate([`/review-page/review-final-page`], {
          queryParams: { productName: this.productName }
        });
      } else {
        // Handle form validation errors or show a message to the user
      }
    }

    updateRoles() {

      const rolesControl = this.reviewForm.get('roles');
      if (rolesControl) {
        Object.keys(rolesControl.value).forEach((role) => {
          if (rolesControl.value[role]) {
            // Push the role label into the roles array
            this.role = this.roleLabels[role];
          }
        });
      }
    }

    goToProductReviewpage() {
      var product= this.metaDataStore.getProductReviewDetails();
      this.router.navigate([`/review-page/review-detail-page/${product?.productId}`]);
    }
};
