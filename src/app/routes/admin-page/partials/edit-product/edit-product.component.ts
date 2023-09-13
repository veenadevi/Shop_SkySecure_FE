import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { OEMDetails } from 'src/shared/models/interface/partials/oem-details';
import { map, filter, Subscription, switchMap, forkJoin } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { DatePipe } from '@angular/common';

interface CreateProductPayload {
  _id: String,
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
  productSkuId: String,
  featureList: Array<any>,
  isVariant: Boolean,
  productId: String,
  productFAQ: Array<any>,
  updatedAt:Date,
 

}


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [DatePipe] 
})
export class EditProductComponent  implements OnInit {
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

  subscriptionTypeList: any = ['Month', 'Year'];
  showProducts = false;
  registrationForm: FormGroup;
  addDynamicElementNew: FormArray;
  addFAQArrayNew: FormArray;
  brandIds: Array<string>;

  createProductPayload: any;
  public currentRoute: string;
  productResult : any;
  selectedItemId: String;
  defaultDiscount: number;
  selectedProductId : any;
  selectedProductId1 : any[] = [];
  showMsg: boolean = false;

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private metaDataSvc: MetadataService,
    private metadataStore: MetadataStore,
    private http: HttpClient,
    private router : Router,
    private route: ActivatedRoute,
    private userAccountStore :UserAccountStore,
    private datePipe: DatePipe
  ) {
    this.registrationForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productSkuNumber: ['', Validators.required],
      productSkuId: ['', Validators.required],
      productOrderNumber: [''],
      productPrice: [''],
      erpPrice: [''],
      discount: [''],
      categories: ['', Validators.required],
      Subcategories: ['', Validators.required],
      OEM: ['', Validators.required],
      subscriptionType: [''],
      isVariant: ['false'],
      file: [null],
      products: [''],
      createdBy:[''],
      updatedBy:[''],
      updatedDate:[''],
      updatedAt:[''],
      addDynamicElementNew: this.fb.group({
        // Nested form controls for dynamic elements
       feature: this.fb.array([])
      }),
      addFAQArrayNew: this.fb.group({
        // Nested form controls for dynamic elements
       faq: this.fb.array([])
      })
    })
    
    this.addDynamicElementNew = this.registrationForm.get('addDynamicElementNew') as FormArray;
   
     this.addFAQArrayNew = this.registrationForm.get('addFAQArrayNew') as FormArray;
    this.defaultDiscount=18;
  }
  
  //########################## File Upload ########################/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  public ngOnInit(): void {
  //  const productId = this.route.snapshot.paramMap.get('id');
    //console.log("_DATA_",productId);
  //  this.getProductDetails(productId);
    this.getSubCategories();
    this.getCategories();
    this.getOEMs();
  }

  createFeatureGroup(): FormGroup {
    return this.fb.group({
      _id: null,
      name: '',
      description: '',
      hyperLinkURL: ''
    });
  }

  createFeatureGroupWithValue(_id, name,description,hyperLinkURL): FormGroup {
    return this.fb.group({
      _id: _id,
      name: name,
      description: description,
      hyperLinkURL: hyperLinkURL
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


  private getOEMs(): OEMDetails[] {
    let OEMResponse = null;
    this.subscriptions.push(
      this.metaDataSvc.fetchOEM().subscribe(response => {
        this.metadataStore.setOEMDetails(response.oems);
        this.oemList = response.oems;
        this.brandIds = this.oemList.map((data) => data._id);
        this.getProducts();
      })

    );
    return OEMResponse;
  }

  private getProducts() {
    this.subscriptions.push(
      this.metaDataSvc.fetchProductsByFilters({subCategoryIds: [],brandIds: this.brandIds}).subscribe(response => {
        this.products = response.products;
        console.log("__TEST__",this.products);
      })

    );
  }

  private getProductDetails(productId) {
    console.log("fetching product for +======"+productId)
    this.subscriptions.push(
    
      this.metaDataSvc.fetchAdminProductDetails(productId).subscribe(response => {
       this.productResult = response;
       this.fillFormDetails(this.productResult);
      })
    );
  }

  createFAQGroup(): FormGroup {
    return this.fb.group({
      Question: '',
      Answer: ''
    });
  }

  createFAQGroupWithValue(Question,Answer): FormGroup {
    return this.fb.group({
      Question: Question,
      Answer: Answer
    });
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
  // changeCategories(event: any) {
  //   const selectedValue = event.target.value.toString();
  //   const categoryMap = new Map<string, any>();
  //   this.categories.forEach(category => {
  //     categoryMap.set(category._id.toString(), category);
  //   });
  //   const selectedCategory = categoryMap.get(selectedValue);
  // }

  

  changeCategories(event: any) {
    
    const selectedValue = event.target.value;
    // console.log("selectedValue  "+selectedValue)
    const categoryMap = new Map<string, any>();
    this.categories.forEach(category => {
      categoryMap.set(category._id.toString(), category);
    });
    const selectedCategory = categoryMap.get(selectedValue);
    // console.log("selectedCategory  "+selectedCategory._id)

    this.subCategories =  selectedCategory.subCategories;
   

  }

  // Choose Subcategories using select dropdown
  changeSubcategories(e) {
    console.log("TEST___",e.target.value)
    this.registrationForm.get('Subcategories').setValue(e.target.value, {
      onlySelf: true
    // this.registrationForm.get('Subcategories').setValue(e.target.value.substring(3), {
    //   onlySelf: true
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

  selectProduct(event: any) {

    if(this.selectedProductId){
      console.log("()()()",this.selectedProductId);
    
    
      //this.selectedProductId = event.target.value.substring(3);
      //this.selectedProductId = this.selectedProductId.replace(' ','')
      //this.selectedProductId = this.selectedProductId._id;
      this.getProductDetails(this.selectedProductId._id);
    }
    else{
      this.registrationForm.reset();
      location.reload();
      this.addDynamicElementNew = null;
    }
    
  }

  selectSimilarProduct(event: any) {

    console.log("++++++++ ______ ", event.value);
    
  }

  //############### Add Dynamic Elements ###############/
  get addDynamicElement() {
    return this.registrationForm.get('addDynamicElementNew') as FormArray
  }

  addSuperPowers() {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    featureArray.push(this.createFeatureGroup());
  }

  onSubmit(): any {
    this.submitted = true;
  }

  // Submit Registration Form
  editProduct(): any {
  //  this.submitted = true;

  console.log("+_)(*&^%%$$ ", this.selectedProductId1);

    /*if (!this.registrationForm.valid) {
   
   
      return false;
    } else {
      let userAccountdetails = this.userAccountStore.getUserDetails();
      //createdBy : userAccountdetails.firstName,

      console.log("Final value", this.registrationForm.value);
      var productData = this.registrationForm.value;
      this.createProductPayload = {
        _id: this.selectedProductId._id,
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
          "ERPPrice":productData.erpPrice,
          "discountRate": productData.discount
        }],
        productFAQ: productData.addFAQArrayNew.faq,
        isActive: true,
        isVariant: productData.isVariant == 'true'? true: false ,
        featureList: productData.addDynamicElementNew.feature,
        bannerLogo: this.productLogo,
        createdBy: 'ADMIN',
        updatedBy: userAccountdetails.firstName,
      }
      console.log("_createProductPayload_", this.createProductPayload);
      var endPoint = `${environment.gatewayUrl}api/admin/product/edit`
      this.http.patch(endPoint,this.createProductPayload).subscribe((response) => {
        console.log("__RESPONSE_",response);
        this.showMsg=true
      })
         this.registrationForm.reset();
    }*/
  }

  removeFeature(data: any) {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    featureArray.removeAt(data);
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

  removeFAQ(data: any) {
    const faqArray = this.addFAQArrayNew.get('faq') as FormArray; // Get the nested FormArray
    if(data>0){
    faqArray.removeAt(data);
    }
  }

  fillFormDetails(response) {
    console.log("created By ====="+response.products.createdB)
   let  formattedDate = this.datePipe.transform(response.products.updatedAt, 'dd-MM-YYYY');
    this.registrationForm.get('createdBy').setValue(response.products.createdBy, {
      onlySelf: true
    }) 
    this.registrationForm.get('updatedBy').setValue(response.products.updatedBy, {
      onlySelf: true
    }) 
    this.registrationForm.get('updatedAt').setValue(formattedDate, {
      onlySelf: true
    }) 
    this.registrationForm.get('productName').setValue(response.products.name, {
      onlySelf: true
    })

    this.registrationForm.get('productDescription').setValue(response.products.name, {
      onlySelf: true
    })

    this.registrationForm.get('productDescription').setValue(response.products.description, {
      onlySelf: true
    })

    this.registrationForm.get('productSkuNumber').setValue(response.products.productSkuNumber, {
      onlySelf: true
    })

    this.registrationForm.get('productSkuId').setValue(response.products.productSkuId, {
      onlySelf: true
    })

    this.registrationForm.get('productOrderNumber').setValue(response.products.orderNumber, {
      onlySelf: true
    })

    this.registrationForm.get('productPrice').setValue(response.products.priceList[0].price, {
      onlySelf: true
    })

    this.registrationForm.get('erpPrice').setValue(response.products.priceList[0].ERPPrice, {
      onlySelf: true
    })

    this.registrationForm.get('discount').setValue(response.products.priceList[0].discountRate, {
      onlySelf: true
    })
    this.registrationForm.get('categories').setValue(response.products.categories[0]._id, {
      onlySelf: true
    })

    this.registrationForm.get('Subcategories').setValue(response.products.subCategoryId, {
      onlySelf: true
    })

    this.registrationForm.get('OEM').setValue(response.products.oemId, {
      onlySelf: true
    })

    this.registrationForm.get('subscriptionType').setValue(response.products.priceList[0].priceType, {
      onlySelf: true
    })
    
    let isVariant = response.isProduct == true ? 'false' : 'true'
    this.registrationForm.get('isVariant').setValue(isVariant, {
      onlySelf: true
    })

    this.registrationForm.get('file').setValue(response.products.bannerLogo, {
      onlySelf: true
    })

    this.productLogo = response.products.bannerLogo;
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray;
    console.log("===featureArray ==="+featureArray.length)
    response.featureList.forEach((feature) => {
      featureArray.push(this.createFeatureGroupWithValue(feature.featureId,  feature.name,feature.description,feature.hyperLinkURL)); 
    })

    const faqArray = this.addFAQArrayNew.get('faq') as FormArray;
    console.log("faqArray====="+response.products.productFAQ.length)
    response.products.productFAQ.forEach((faq) => {
      faqArray.push(this.createFAQGroupWithValue(faq.Question, faq.Answer)); 
    })
    this.submitted = true;
  }

  get addFAQ() {
    return this.registrationForm.get('addNewFAQ') as FormArray
  }

  addNewFAQ() {
    const faqArray = this.addFAQArrayNew.get('faq') as FormArray; // Get the nested FormArray
    faqArray.push(this.createFAQGroup());
  }

  addNewFeature() {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    featureArray.push(this.createFeatureGroup());
  }

  changeSubscriptionType(e) {
    console.log("subscription value "+e.target.value)
    this.registrationForm.get('subscriptionType').setValue(e.target.value, {
      onlySelf: true
    })
  }

  formRest(){
    this.registrationForm.reset();
    return true;
  }
}