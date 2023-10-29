import { Component,ViewChild ,ElementRef, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { MetadataService } from 'src/shared/services/metadata.service';
import { ToasterNotificationService } from 'src/shared/services/toaster-notification.service';
import { GlobalSearchService } from 'src/shared/services/global-search.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-review-final-page',
  templateUrl: './review-final-page.component.html',
  styleUrls: ['./review-final-page.component.css']
})
export class ReviewFinalPageComponent implements OnInit{
  registrationForm: FormGroup;
  productReview : any =  {}
  productList : Array<any> = []
  productName
  cumulativeRating: number = 0;
  easyToUseRating
  customerSupportRating
  featuresRating
  valueOfMoneyRating
  overAllRating
  averageRating
rating

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private metaDataStore: MetadataStore,
    private metaDataService: MetadataService,
    private toaster : ToasterNotificationService,
    private globalSearchSvc: GlobalSearchService,
    private route: ActivatedRoute
  ) {
    this.registrationForm = this.fb.group({
      file: [null],
    })
    this.route.queryParams.subscribe(params => {
      this.productName = params.productName;
    });
     
  }
  public productLogo: string;
  public fileToUpload: File | null = null;

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any;
  editFile: boolean = true;
  removeUpload: boolean = false;


  uploadFile(event: any) {
    // console.log("__TEST__", event);
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          // console.log('Upload successful', response);
          this.productLogo = response.filePath;
          console.log(response,"response")
          // Handle the response from the server
        },
        error => {
          console.error('Upload error:', error);
          // Handle the error response
        }
      );
  }

  removeImage() {
    this.productLogo = null;
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }

  ngOnInit(): void {
    this.productReview =  {...this.metaDataStore.getProductReviewDetails(), ...this.metaDataStore.getProductReviewOtherDetails()};
    // console.log("___TEST___FULL PAYLOAD____",this.productReview); 
    // console.log("productName ",this.productName=this.productReview.productName); 
    // console.log("customerSupportRating",this.customerSupportRating=this.productReview.customerSupportRating  )
    // console.log("featuresRating",this.featuresRating=this.productReview.featuresRating)
    // console.log("overAllRating",this.overAllRating=this.productReview.overAllRating)
    // console.log("valueOfMoneyRating",this.valueOfMoneyRating =this.productReview.valueOfMoneyRating )
    // console.log("easyToUseRating",this.easyToUseRating=this.productReview.easyToUseRating )
    const averageRating = this.customerSupportRating+ this.featuresRating+this.overAllRating+this.valueOfMoneyRating+this.easyToUseRating;
   this.rating= this.averageRating % 5;
   //console.log("this.rating",this.rating)
  
  
   
  // const starRating = this.getStarRating(averageRating);
  // console.log("Star Rating (Whole):", starRating.whole);
  // console.log("Star Rating (Fractional):", starRating.fractional);
  
  }  

  createProductReview(): void {
    this.metaDataService.createProductReview(this.productReview).subscribe((data) => {
    //  console.log("___DATA____",data);
      if(data) this.toaster.showSuccess("Product Review Created Successfully",'');
      else {
        this.toaster.showError("Failed To Create Product Review","");
      }
    })
  }
  // public getStarRating(averageRating: number): { whole: number, fractional: number } {
  //   const whole = Math.floor(averageRating); // Integer part
  //   const fractional = averageRating - whole; // Fractional part
  
  //   return { whole, fractional };
  // }
 

 
}


