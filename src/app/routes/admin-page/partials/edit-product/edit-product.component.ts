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
  shortDescription: String,
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
  appList:Array<any>,
  compareWithproducts:Array<any>,
  productupdateComment:String
 

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
  public selectedProductIds :any[]=[];
  public products: any[] = [];

  public tempYerpPrice:any;
  public tempMerpPrice : any;
  
  public compareproducts: any[] = [];
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
  addAppArrayNew:FormArray;
  addFAQArrayNew: FormArray;
  brandIds: Array<string>;
  compareProductListIds:Array<string>

  createProductPayload: any;
  public currentRoute: string;
  productResult : any;
  selectedItemId: String;
  defaultDiscount: number;
  selectedProductId : any;
  selectedProductId1 :  any;
  showMsg: boolean = false;
  listedProducts:any[]=[];

  public tempAppList : any[] = [];

  public sampleImg = 'https://csg1003200209655332.blob.core.windows.net/images/1695186760-linkedin.png';

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
      productShortDescription:[''],
      productSkuNumber: ['', Validators.required],
      productSkuId: ['', Validators.required],
      productOrderNumber: [''],
      yproductPrice: [''],
      yerpPrice: [''],
      ydistributorPrice:[''],
      ydiscount: [''],
      mproductPrice: [''],
      merpPrice: [''],
      mdistributorPrice:[''],
      mdiscount: [''],
      categories: ['', Validators.required],
      Subcategories: ['', Validators.required],
      selectedProductIds:[''],
      selectedProductId1:[''],
      OEM: ['', Validators.required],
      ysubscriptionType: [''],
      msubscriptionType: [''],
      isVariant: ['false'],
      file: [null],
      products: [''],
      compareproducts:[''],
      createdBy:[''],
      updatedBy:[''],
      updatedDate:[''],
      updatedAt:[''],
      productversion:[''],
      productupdateComment:[''],
      addDynamicElementNew: this.fb.group({
        // Nested form controls for dynamic elements
       feature: this.fb.array([0])
      }),
      addFAQArrayNew: this.fb.group({
        // Nested form controls for dynamic elements
       faq: this.fb.array([0])
      }),
      addAppArrayNew: this.fb.group({
        // Nested form controls for dynamic elements
       app: this.fb.array([0])
      })
    })
    
    this.addDynamicElementNew = this.registrationForm.get('addDynamicElementNew') as FormArray;
   
     this.addFAQArrayNew = this.registrationForm.get('addFAQArrayNew') as FormArray;
     this.addAppArrayNew = this.registrationForm.get('addAppArrayNew') as FormArray;
    this.defaultDiscount=18;
  }
  
  //########################## File Upload ########################/
  @ViewChild('fileInput') el: ElementRef;
  imageURL: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
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

  createAppGroup(): FormGroup {
    return this.fb.group({
      
      name: '',
      imageURL: ''
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
        this.getAllProducts();
      })

    );
    return OEMResponse;
  }

  private getProducts() {
    this.subscriptions.push(
      this.metaDataSvc.fetchProductsByFilters({subCategoryIds: [],brandIds: this.brandIds}).subscribe(response => {
        this.products = response.products;
        
      })

    );
  }
  private getAllProducts() {
    this.subscriptions.push(
      this.metaDataSvc.fetchProductsByFilters({subCategoryIds: [],brandIds: this.brandIds}).subscribe(response => {
        this.listedProducts=response.products;
        this.listedProducts.map((data) => {
        const newProduct = { id: data._id, name:data.name}

        this.compareproducts.push(newProduct)
        });
      

      })

      );
    }
  

  private getProductDetails(productId) {
    
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

  createAppList(): FormGroup {
    return this.fb.group({
      name: '',
      imageURL: ''
    });
  }
  createAppListWithValue(id,name,imageURL): FormGroup {
    return this.fb.group({
     _id: id,
      name: name,
      imageURL: imageURL
    });
  }
  uploadFile(event: any) {
    
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          
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

  removeAppImage(index){
    
    this.tempAppList[index].imageURL = "";
  }


  public tempAppArrayImgFiles = [];

  uploadFileForApp(event : any, i){
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          
          this.tempAppArrayImgFiles.push({
            'index': i,
            'val' : response.filePath
          })
          //this.productLogo = response.filePath;
        },
        error => {
          console.error('Upload error:', error);
          // Handle the error response
        }
      );
  }
  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageURL = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
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

    
    
    var selectedproductList=event.value

    this.compareProductListIds = selectedproductList.map((data) => data.id);

    
    
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

  

    if (!this.registrationForm.valid) {
   
   
      return false;
    } else {
      let userAccountdetails = this.userAccountStore.getUserDetails();
      //createdBy : userAccountdetails.firstName,

   
      var productData = this.registrationForm.value;
     // console.log("passing edit value===",productData.addAppArrayNew.app)
      this.createProductPayload = {
        _id: this.selectedProductId._id,
        name: productData.productName,
        description: productData.productDescription,
        shortDescription:productData.productShortDescription,
        oemId: productData.OEM,
        subCategoryId: productData.Subcategories,
       
        productId: productData.products,
        productSkuId: productData.productSkuId,
        productSkuNumber: productData.productSkuNumber,
        orderNumber: productData.productOrderNumber,


        priceList: [{
          "Currency": "INR",
          "price": productData.yproductPrice,
         // "price": this.setYearlyPrice(productData),
          "priceType": "Year",
          "ERPPrice" : Math.round(parseFloat(productData.yerpPrice.toString())).toFixed(2),
          "distributorPrice":Math.round(parseFloat(productData.ydistributorPrice.toString())).toFixed(2),
          "discountRate" : productData.ydiscount,
          

        },
        {
          "Currency": "INR",
          "price": productData.mproductPrice,
          "priceType": "Month",
          "ERPPrice" : parseFloat(productData.merpPrice.toString()).toFixed(2),
          "distributorPrice":parseFloat(productData.mdistributorPrice.toString()).toFixed(2),
          "discountRate" : productData.mdiscount

        }],


      
        productFAQ: productData.addFAQArrayNew.faq,
        isActive: true,
        isVariant: productData.isVariant == 'true'? true: false ,
        featureList: productData.addDynamicElementNew.feature,
        productupdateComment:productData.productupdateComment,
        
        
        appList:productData.addAppArrayNew.app,
        bannerLogo: this.productLogo,
      //  createdBy: productData.createdBy,
        updatedBy: userAccountdetails._id,
        compareWithproducts:this.compareProductListIds
      }

      if(this.createProductPayload.appList && this.createProductPayload.appList.length>0){


        for(let i=0;i<this.createProductPayload.appList.length;i++){
          const result = this.tempAppArrayImgFiles.filter((obj) => {
            return obj.index === i;
          });

          if(result && result.length>0){
          //  this.createProductPayload.appList[i].File = result[0].val;
            this.createProductPayload.appList[i].imageURL = result[0].val;
          }
          else{
            this.createProductPayload.appList[i].imageURL = "";
          }
        }

        
      }
      
      
      var endPoint = `${environment.gatewayUrl}api/admin/product/edit`
      this.http.patch(endPoint,this.createProductPayload).subscribe((response) => {
        
        this.showMsg=true
      })
         this.registrationForm.reset();
         this.selectedProductId.reset();
         
    }
  }


  public setYearlyPrice(data){

    let yskySecurePrice = ((Number(data.yerpPrice)) * 0.02) + (Number(data.ydistributorPrice));
    return Math.round(parseFloat(yskySecurePrice.toString())).toFixed(2);
    
  }

  public setMonthlyPrice(data){

    let mskySecurePrice = ((Number(data.merpPrice)) * 0.02) + (Number(data.mdistributorPrice));
    let fixedValue=parseFloat(mskySecurePrice.toString()).toFixed(2);
   // console.log("fixedValue   ...",fixedValue)
    return Math.round(parseFloat(fixedValue))
    
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
    if(data>=0){
    faqArray.removeAt(data);
    }
  }

  fillFormDetails(response) {
    
   let  formattedDate = this.datePipe.transform(response.products.updatedAt, 'dd-MM-YYYY');
   
    this.registrationForm.get('createdBy').setValue(response.createdBy, {
      onlySelf: true
    }) 
    this.registrationForm.get('updatedBy').setValue(response.updatedBy, {
      onlySelf: true
    }) 
    this.registrationForm.get('updatedAt').setValue(formattedDate, {
      onlySelf: true
    }) 
    this.registrationForm.get('productversion').setValue(response.products.productversion.$numberDecimal
      , {
      onlySelf: true
    }) 

    this.registrationForm.get('productupdateComment').setValue(response.products.productupdateComment, {
      onlySelf: true
    }) 


   
    this.registrationForm.get('productName').setValue(response.products.name, {
      onlySelf: true
    })

    this.registrationForm.get('productDescription').setValue(response.products.description, {
      onlySelf: true
    })

    this.registrationForm.get('productShortDescription').setValue(response.products.shortDescription, {
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

    this.registrationForm.get('yproductPrice').setValue(response.products.priceList[0].price, {
      onlySelf: true
    })
    this.registrationForm.get('ydistributorPrice').setValue(response.products.priceList[0].price, {
      onlySelf: true
    })

    this.registrationForm.get('yerpPrice').setValue(response.products.priceList[0].ERPPrice, {
      onlySelf: true
    })

    this.registrationForm.get('ydiscount').setValue(response.products.priceList[0].discountRate, {
      onlySelf: true
    })


    this.registrationForm.get('mproductPrice').setValue(response.products.priceList[1].price, {
      onlySelf: true
    })

    this.registrationForm.get('merpPrice').setValue(response.products.priceList[1].ERPPrice, {
      onlySelf: true
    })
    this.registrationForm.get('mdistributorPrice').setValue(response.products.priceList[1].price, {
      onlySelf: true
    })

    this.registrationForm.get('mdiscount').setValue(response.products.priceList[1].discountRate, {
      onlySelf: true
    })

    this.registrationForm.get('categories').setValue(response.products.categories[0]._id, {
      onlySelf: true
    })

 

 this.setDefaultCompareProductsSelected(response.products.compareWithproducts);

  /*this.selectedProductId1=[response.products.compareWithproducts];
 
    this.registrationForm.get('selectedProductId1').setValue(['64bdffaa5559b600556bc31e', '64be072a5559b600556bc75b']
    ) */

    this.registrationForm.get('Subcategories').setValue(response.products.subCategoryId, {
      onlySelf: true
    })

    this.registrationForm.get('OEM').setValue(response.products.oemId, {
      onlySelf: true
    })

    this.registrationForm.get('msubscriptionType').setValue(response.products.priceList[1].priceType, {
      onlySelf: true
    })
    this.registrationForm.get('ysubscriptionType').setValue(response.products.priceList[0].priceType, {
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
    
    response.featureList.forEach((feature) => {
      featureArray.push(this.createFeatureGroupWithValue(feature.featureId,  feature.name,feature.description,feature.hyperLinkURL)); 
    })

    const faqArray = this.addFAQArrayNew.get('faq') as FormArray;

    response.products.productFAQ.forEach((faq) => {
      faqArray.push(this.createFAQGroupWithValue(faq.Question, faq.Answer)); 
    })

    

    const appNewArray = this.addAppArrayNew.get('app') as FormArray;

    response.appList.forEach((app) => {

     // console.log(" passing value to payload  for app ", app.appId,app.name, app.imageURL)
      
      appNewArray.push(this.createAppListWithValue(app.appId,app.name, app.imageURL));

      

      //faqArray.push(this.createFAQGroupWithValue(faq.Question, faq.Answer)); 
    })

    appNewArray.value.forEach(element => {
      this.tempAppList.push(element);
    });

    
     
      




    this.submitted = true;
  }

  get addFAQ() {
    return this.registrationForm.get('addNewFAQ') as FormArray
  }

  public setDefaultCompareProductsSelected(data){

    //this.selectedProductId1=[data];
    
    this.selectedProductId1= [];

if(data){


    data.forEach(element => {
      
      this.compareproducts.map((item) => {
        
        if(item.id === element){
          this.selectedProductId1.push(item);
        }
        
      });
    });

    this.compareProductListIds = [];
    this.selectedProductId1.forEach(element => {
      this.compareProductListIds.push(element.id);
    });
    
  }
  }

  addNewFAQ() {
    const faqArray = this.addFAQArrayNew.get('faq') as FormArray; // Get the nested FormArray
    faqArray.push(this.createFAQGroup());
  }

  addNewFeature() {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    featureArray.push(this.createFeatureGroup());
  }

  addNewApp() {
    const appArray = this.addAppArrayNew.get('app') as FormArray; // Get the nested FormArray
    appArray.push(this.createAppGroup());
    this.tempAppList.push({
      name : "",
      imageURL: "",
      _id : "",
    })
  }
  changeSubscriptionType(e) {
   
    this.registrationForm.get('subscriptionType').setValue(e.target.value, {
      onlySelf: true
    })
  }

  removeApp(data: any) {
    const appArray = this.addAppArrayNew.get('app') as FormArray; // Get the nested FormArray
    if(data>=0){
    appArray.removeAt(data);
    this.tempAppList.splice(data, 1);
    }
  
  }

  formRest(){
    this.registrationForm.reset();
    return true;
  }
  public calDiscountedVal(erp,calVal){
    return ((erp-calVal)/erp)*100;
  }

  public onPriceChange(val){

    switch (val) {
      case 'yerpPrice':
        this.tempYerpPrice = ((Number(this.registrationForm.value.yerpPrice)) * 0.02) + (Number(this.registrationForm.value.ydistributorPrice));
        this.registrationForm.controls['yproductPrice'].setValue(this.tempYerpPrice)
       
        this.registrationForm.controls['ydiscount'].setValue(this.calDiscountedVal(this.registrationForm.value.yerpPrice, this.tempYerpPrice).toFixed(2));
        return;
      case 'merpPrice':
        this.tempMerpPrice = ((Number(this.registrationForm.value.merpPrice)) * 0.02) + (Number(this.registrationForm.value.mdistributorPrice));
        this.registrationForm.controls['mproductPrice'].setValue(this.tempMerpPrice)
        this.registrationForm.controls['mdiscount'].setValue(this.calDiscountedVal(this.registrationForm.value.merpPrice, this.tempMerpPrice).toFixed(2));
        return;

      default:
        return null;
    }


    // switch (val) {
    //   case 'yerpPrice':
    //     this.tempYerpPrice = ((Number(this.registrationForm.value.yerpPrice)) * 0.02) + (Number(this.registrationForm.value.ydistributorPrice));
    //     this.registrationForm.controls['ydiscount'].setValue(Math.round(this.calDiscountedVal(this.registrationForm.value.yerpPrice, this.tempYerpPrice)));
    //     return;
    //   case 'merpPrice':
    //     this.tempMerpPrice = ((Number(this.registrationForm.value.merpPrice)) * 0.02) + (Number(this.registrationForm.value.mdistributorPrice));
    //     this.registrationForm.controls['mdiscount'].setValue(Math.round(this.calDiscountedVal(this.registrationForm.value.merpPrice, this.tempMerpPrice)));
    //     return;

    //   default:
    //     return null;
    // }
  }
}