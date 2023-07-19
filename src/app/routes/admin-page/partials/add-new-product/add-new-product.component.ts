import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { OEMDetails } from 'src/shared/models/interface/partials/oem-details';
import { map, filter, Subscription, switchMap, forkJoin } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { HttpClient } from '@angular/common/http';
import { computeStyles } from '@popperjs/core';

interface CreateProductPayload {
  name: String,
  description: String,
  oemId: String,
  subCategoryId: String,
  createdBy: String,
  updatedBy: String,
  orderNumber: Number,
  bannerLogo: String,
  isActive: Boolean,
  priceList: Array<any>,
  productSkuNumber: String,
  productSkuId: Number,
  featureList: Array<any>,
  isVariant: Boolean,
  productId: String,
  productFAQ:Array<any>,
}

@Component({
  selector: 'app-admin-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})

export class AddNewProductComponent  implements OnInit {
  submitted = false;
  public subscriptions: Subscription[] = [];
  public categories: CategoryDetails[] = [];
  public products: any[] = [];
  public selectedCategory: any = {};
  public oemList: OEMDetails[] = [];
  public subCategories: any[] = [];
  public fileToUpload: File | null = null;
  public productLogo: string;
  // City names
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

  subscriptionTypeList: any = ['Monthly', 'Yearly'];
  showProducts = false;
  registrationForm: FormGroup;
  addDynamicElementNew: FormArray;
  addFAQElementNew: FormArray;

  createProductPayload: CreateProductPayload;

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private metaDataSvc: MetadataService,
    private metadataStore: MetadataStore,
    private http: HttpClient
  ) {
    this.registrationForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productSkuNumber: ['', Validators.required],
      productSkuId: ['', Validators.required],
      productOrderNumber: ['', Validators.required],
      productPrice: ['', Validators.required],
      categories: ['', Validators.required],
      Subcategories: ['', Validators.required],
      OEM: ['', Validators.required],
      subscriptionType: ['', Validators.required],
      isVariant: ['false'],
      file: [null],
      products: [''],

      addDynamicElementNew: this.fb.group({
        // Nested form controls for dynamic elements
        feature: this.fb.array([
          this.createFeatureGroup()
        ])
      }),

      addFAQElementNew: this.fb.group({
        // Nested form controls for dynamic elements
        faq: this.fb.array([
          this.createFAQGroup()
        ])
      })
    })
    this.addDynamicElementNew = this.registrationForm.get('addDynamicElementNew') as FormArray;
    this.addFAQElementNew = this.registrationForm.get('addFAQElementNew') as FormArray;
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  //########################## File Upload ########################/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  public ngOnInit(): void {
   // this.getSubCategories();
    this.getCategories();
    this.getOEMs();
    this.getProducts();
  }

  createFeatureGroup(): FormGroup {
    return this.fb.group({
      name: '',
      description: '',
      hyperLinkURL: ''
    });
  }


  createFAQGroup(): FormGroup {
    return this.fb.group({
      Question: '',
      Answer: ''
     
    });
  }

  private getCategories(): CategoryDetails[] {
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchCategory().subscribe(response => {
        this.metadataStore.setCategoryDetails(response.categorys);
        this.categories = response.categorys;
      })

    );
    return categoryResponse;
  }

  private getSubCategories(): any[] {
    let categoryResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchSubCategory().subscribe(response => {
        this.subCategories = response.subCategories;
      })

    );
    return categoryResponse;
  }

  // private getSubCategoriesByCatId(catid): any[] {
  //   let categoryResponse = null;
  //   this.subscriptions.push(
  //     this.metaDataSvc.fetchSubCategory().subscribe(response => {
  //       this.subCategories = response.subCategories;
  //     })

  //   );
  //   return categoryResponse;
  // }


  private getOEMs(): OEMDetails[] {
    let OEMResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchOEM().subscribe(response => {
        this.metadataStore.setOEMDetails(response.oems);
        this.oemList = response.oems;
      })

    );
    return OEMResponse;
  }

  private getProducts() {
    this.subscriptions.push(
      this.metaDataSvc.fetchProducts().subscribe(response => {
        this.products = response.products;
      })

    );
  }

  uploadFile(event: any) {
    console.log("__TEST__", event);
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          console.log('Upload successful', response);
          this.productLogo = response.filePath;
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

  // Getter method to access formcontrols
  get myForm() {
    return this.registrationForm.controls;
  }

  // Choose Subcategories using select dropdown
  changeCategories(event: any) {
    var selectedValue = event.target.value;
    var categoryMap = new Map<string, any>();
    /*this.categories.forEach(category => {
      categoryMap.set(category._id.toString(), category);

    });*/
    console.log("+++++++ MAp", this.categories);
    console.log("+++++++ MAp1", selectedValue);
    


    var selectedCat = this.categories.filter(event => (event._id == selectedValue));
    console.log("+++++++ MAp", selectedCat);
    this.subCategories = selectedCat[0].subCategories;
    const selectedCategory = categoryMap.get(selectedValue);

  }

  // Choose Subcategories using select dropdown
  changeSubcategories(e) {

    var selectedValue = e.target.value;
    console.log("====selectedValue selectedValue ===="+selectedValue)
    var selectedSubCat = this.subCategories.filter(event => (event._id == selectedValue));
    console.log("====selectedValue changeSubcategories ===="+selectedSubCat[0].name)
    this.registrationForm.get('Subcategories').setValue(e.target.value, {
      onlySelf: true
    })
  }



  // Choose Subcategories using select dropdown
  changeOEM(e) {
    this.registrationForm.get('OEM').setValue(e.target.value.substring(3), {
      onlySelf: true
    })
  }

  changeProduct(e) {
    this.registrationForm.get('products').setValue(e.target.value.substring(3), {
      onlySelf: true
    })
  }



  //############### Add Dynamic Elements ###############/
  get addDynamicElement() {
    return this.registrationForm.get('addDynamicElementNew') as FormArray
  }
  get addFAQElement() {
    return this.registrationForm.get('addFAQElementNew') as FormArray
  }

  addNewFeature() {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    featureArray.push(this.createFeatureGroup());
  }

  addNewFAQ() {
    const faqArray = this.addFAQElementNew.get('faq') as FormArray; // Get the nested FormArray
    faqArray.push(this.createFAQGroup());
  }

  // Submit Registration Form
  onSubmit(): any {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      console.log("calling submit")
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log("Final value", this.registrationForm.value);
      var productData = this.registrationForm.value;

      this.createProductPayload = {
        name: productData.productName,
        description: productData.productDescription,
        oemId: productData.OEM,
        subCategoryId: productData.Subcategories,
        productId: productData.products,
        productSkuId: productData.productSkuId,
        productSkuNumber: productData.productSkuNumber,
        orderNumber: productData.productOrderNumber,
        priceList: [{
          "Currency": "INR",
          "price": productData.productPrice,
          "priceType": productData.subscriptionType,
          "ERPPrice" :productData.productPrice*.20,
          "discountRate" : "18"
        }],
        isActive: true,
        isVariant: productData.isVariant == 'true'? true: false ,
        featureList: productData.addDynamicElementNew.feature,
        productFAQ:productData.addFAQElementNew.faq,
        bannerLogo: this.productLogo,
        createdBy: 'ADMIN',
        updatedBy: 'ADMIN'
      }
      console.log("_createProductPayload_", this.createProductPayload);
      this.http.post('http://localhost:8002/api/admin/product/create',this.createProductPayload).subscribe((response) => {
        console.log("__RESPONSE_",response);
      })
    }
  }

  removeFeature(data: any) {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    featureArray.removeAt(data);
  }

  removeFAQ(data: any) {
    console.log("index to delete "+data);
    if(data>0){
      const fqaArray = this.addFAQElementNew.get('faq') as FormArray; // Get the nested FormArray
      fqaArray.removeAt(data);
    }
    else{
     
        alert('Cannot delete first Row')
      
      } 
    
 
    
    
  }

  onRadioChange(event) {
    this.registrationForm.get('isVariant').setValue(event.target.value, {
      onlySelf: true
    })
    if (event.target.value == 'true')
      this.showProducts = true;
    else {
      this.registrationForm.get('products').setValue(null, {
        onlySelf: true
      })
      this.showProducts = false;
      this.registrationForm.get('isVariant').setValue(event.target.value, {
        onlySelf: true
      })
    }
  }

}