import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDetails } from 'src/shared/models/interface/partials/category-details';
import { OEMDetails } from 'src/shared/models/interface/partials/oem-details';
import { map, filter, Subscription, switchMap, forkJoin } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';
import { LoaderService } from 'src/shared/services/loader.service';
import { MetadataStore } from 'src/shared/stores/metadata.store';
import { HttpClient } from '@angular/common/http';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { AdminPageService } from 'src/shared/services/admin-service/admin-page.service';


interface CreateProductPayload {
  name: String,
  shortDescription : String,
  description: String,
  oemId: String,
  subCategoryId: String,
  createdBy: String,
  updatedBy: String,
  orderNumber: Number,
  bannerLogo: String,
  isActive: Boolean,
  priceList: Array<any>,
  //productVideoURL: Array<any>,
  productSkuNumber: String,
  productSkuId: String,
  featureList: Array<any>,
  productFAQ: Array<any>,
  appList:Array<any>,
  productId: String,
  isPerpetual : boolean,
  isCommercial : boolean,
  isEducational : boolean
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
  isPerpetual: boolean = false;
  
  showData: boolean = false;

 
  // City names
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

  subscriptionTypeList: any = ['Month', 'Year'];
  showProducts = false;
  registrationForm: FormGroup;
  addDynamicElementNew: FormArray;
  addFAQArrayNew: FormArray;
  addAppArrayNew:FormArray;
  defaultDiscount:number;
  showMsg: boolean = false;
  public msubscriptionType:any
  public ysubscriptionType:any
  temp1YerpPrice:any
  temp3YerpPrice :any
  tempLYerpPrice:any; 
  tempEYerpPrice:any;
  createProductPayload: CreateProductPayload;

  public isCommercial : boolean = true;

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private metaDataSvc: MetadataService,
    private metadataStore: MetadataStore,
    private http: HttpClient,
    private userAccountStore : UserAccountStore,
    private adminPageService : AdminPageService
  ) {
    this.registrationForm = this.fb.group({
      productName: ['', Validators.required],
      productShortDescription:['', Validators.required],
      productDescription: ['', Validators.required],
      productSkuNumber: ['', Validators.required],
      productSkuId: ['', Validators.required],
      productOrderNumber: [''],
      yproductPrice: [''],
      yerpPrice: [''],
      yerpPrice1:[''],
      ydistributorPrice1:[''],
      ydiscount1: [''],
      yerpPrice3:[''],
      ydistributorPrice3:[''],
      ydiscount3: [''],
      yerpPriceE:[''],
      ydistributorPriceE:[''],
      ydiscountL: [''],
      yerpPriceL:[''],
      ydistributorPriceL:[''],
      ydiscountE: [''],
      ydistributorPrice:[''],
      ydiscount: [''],
      mproductPrice: [''],
      merpPrice: [''],
      mdistributorPrice:[''],
      mdiscount: [''],
      categories: ['', Validators.required],
      Subcategories: ['', Validators.required],
      OEM: ['', Validators.required],
      ysubscriptionType: 'Year',
      msubscriptionType: [''],
      file: [null],
      products: [''],
      subscriptionType : [''],
      productPrice : [''],
      addDynamicElementNew: this.fb.group({
        // Nested form controls for dynamic elements
        feature: this.fb.array([
          this.createFeatureGroup()
        ])
      }),
      addFAQArrayNew: this.fb.group({
        // Nested form controls for dynamic elements
        faq: this.fb.array([
          this.createFAQGroup()
        ])
      }),
      addAppArrayNew: this.fb.group({
        // Nested form controls for dynamic elements
        app: this.fb.array([
          this.createAppGroup()
        ])
      })
    })
    this.addDynamicElementNew = this.registrationForm.get('addDynamicElementNew') as FormArray;
    this.addFAQArrayNew = this.registrationForm.get('addFAQArrayNew') as FormArray;
    this.addAppArrayNew = this.registrationForm.get('addAppArrayNew') as FormArray;
    this.defaultDiscount=18;
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  //########################## File Upload ########################/
  @ViewChild('fileInput') el: ElementRef;
  imageURL: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  public ngOnInit(): void {
   this.getSubCategories();
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

  uploadFile(event: any) {
    // console.log("__TEST__", event);
    const formData: FormData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.http.post('https://dev-altsys-realize-api.azurewebsites.net/api/file/upload', formData)
      .subscribe(
        (response: any) => {
          // console.log('Upload successful', response);
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

  // Choose Subcategories using select dropdown
  changeCategories(event: any) {
    
    const selectedValue = event.target.value;
    
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
    })

    console.log("+_+_+_+_+_+_+ e.target", e.target.value);
   if(e.target.value === "6566d8ab8132a82bb7dd3f0e"){
      this.isCommercial = true;
      this.isPerpetual = true;
    }
    else if(e.target.value === "6566d8c08132a82bb7dd3f10"){
      this.isCommercial = false;
      this.isPerpetual = true;
    }
    else{
      this.isPerpetual = false;
    }
  }



  // Choose Subcategories using select dropdown
  changeOEM(e) {
    this.registrationForm.get('OEM').setValue(e.target.value.substring(3), {
      onlySelf: true
    })
  }

  changeSubscriptionType(e) {
    // console.log("subscription value "+e.target.value)
    this.registrationForm.get('subscriptionType').setValue(e.target.value, {
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

  get addFAQ() {
    return this.registrationForm.get('addNewFAQ') as FormArray
  }

  addNewFeature() {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    featureArray.push(this.createFeatureGroup());
  }

  addNewFAQ() {
    const faqArray = this.addFAQArrayNew.get('faq') as FormArray; // Get the nested FormArray
    faqArray.push(this.createFAQGroup());
  }
  addNewApp() {
    const appArray = this.addAppArrayNew.get('app') as FormArray; // Get the nested FormArray
    appArray.push(this.createAppGroup());
  }
  onSubmit(): any {
    this.submitted = true;
  }

  // Submit Registration Form
  CreateProduct(): any {
    
    let a=2;
    if (!this.registrationForm.valid) {

      return false;
    } else {
      // console.log("Final value", this.registrationForm.value);

      let userAccountdetails = this.userAccountStore.getUserDetails();
      var productData = this.registrationForm.value;


      let tempPriceList;

      if(this.isPerpetual){


        if(this.isCommercial){
          tempPriceList = [{
            "Currency": "INR",
            //"price": productData.yproductPrice,
            "price": this.temp1YerpPrice,
            "priceType": "1Year",
            "ERPPrice" : parseFloat(productData.yerpPrice1.toString()).toFixed(2),
            "distributorPrice":parseFloat(productData.ydistributorPrice1.toString()).toFixed(2),
            "discountRate" : productData.ydiscount1,
            
  
          },
          {
            "Currency": "INR",
            "price": this.temp3YerpPrice,
            "priceType": "3Year",
            "ERPPrice" : parseFloat(productData.yerpPrice3.toString()).toFixed(2),
            "distributorPrice":parseFloat(productData.ydistributorPrice3.toString()).toFixed(2),
            "discountRate" : productData.ydiscount3
  
          },
          {
            "Currency": "INR",
            "price": this.tempLYerpPrice,
            "priceType": "Lifetime",
            "ERPPrice" : parseFloat(productData.yerpPriceL.toString()).toFixed(2),
            "distributorPrice":parseFloat(productData.ydistributorPriceL.toString()).toFixed(2),
            "discountRate" : productData.ydiscountL
  
          }
        
          ]
        }

        else{
          tempPriceList = [{
            "Currency": "INR",
            "price": this.tempEYerpPrice,
            "priceType": "Lifetime",
            "ERPPrice" : parseFloat(productData.yerpPriceE.toString()).toFixed(2),
            "distributorPrice":parseFloat(productData.ydistributorPriceE.toString()).toFixed(2),
            "discountRate" : productData.ydiscountE
  
          }
        
          ]
        }


 

      }
      else{
        tempPriceList = [{
          "Currency": "INR",
          //"price": productData.yproductPrice,
          "price": this.setYearlyPrice(productData),
          "priceType": "Year",
          "ERPPrice" : parseFloat(productData.yerpPrice.toString()).toFixed(2),
          "distributorPrice":parseFloat(productData.ydistributorPrice.toString()).toFixed(2),
          "discountRate" : productData.ydiscount,
          

        },
        {
          "Currency": "INR",
          "price": this.setMonthlyPrice(productData),
          "priceType": "Month",
          "ERPPrice" : parseFloat(productData.merpPrice.toString()).toFixed(2),
          "distributorPrice":parseFloat(productData.mdistributorPrice.toString()).toFixed(2),
          "discountRate" : productData.mdiscount

        }
      
        ]
      }


      this.createProductPayload = {
        name: productData.productName,
        shortDescription: productData.productShortDescription,
        description: productData.productDescription,
        oemId: productData.OEM,
        subCategoryId: productData.Subcategories,
        productId: productData.products,
        productSkuId: productData.productSkuId,
        productSkuNumber: productData.productSkuNumber,
        orderNumber: productData.productOrderNumber,
        priceList: tempPriceList,
        isActive: true,
       
        featureList: productData.addDynamicElementNew.feature,
        productFAQ: productData.addFAQArrayNew.faq,
        appList:productData.addAppArrayNew.app,

        bannerLogo: this.productLogo,
        createdBy: userAccountdetails._id,
        updatedBy: userAccountdetails._id,
        isPerpetual : this.isPerpetual,
        isCommercial : this.isCommercial,
        isEducational : !this.isCommercial

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

      //console.log("_--------------------APP Array", this.tempAppArrayImgFiles);
      console.log("_--------------------createProductPayload_", this.createProductPayload);
      

      /*
      this.subscriptions.push(
        this.adminPageService.createNewProduct(this.createProductPayload).subscribe(res=>{
          
          this.showMsg=true

        })
      )*/


      
      /*this.http.post('https://dev-productapi.realize.skysecuretech.com/api/admin/product/create',this.createProductPayload).subscribe((response) => {
        
        this.showMsg=true

      })*/

      this.registrationForm.reset(); 
    }
  }

//   public setFAQList(productData){
//    let length= productData.addDynamicElementNew.feature.length;
//    console.log("length  of faq list",length)
//     const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
//    if(length==1){
//      featureArray.removeAt(0);
//    }
//    let length1= productData.addDynamicElementNew.feature.length;
//    console.log("length  after faq list",length1)
   
// return productData.addDynamicElementNew.feature;

//   }
  public setYearlyPrice(data){

    let yskySecurePrice = ((Number(data.yerpPrice)) * 0.02) + (Number(data.ydistributorPrice));
    return parseFloat(yskySecurePrice.toString()).toFixed(2);
    
  }

  public setMonthlyPrice(data){

    let mskySecurePrice = ((Number(data.merpPrice)) * 0.02) + (Number(data.mdistributorPrice));
    let fixedValue=parseFloat(mskySecurePrice.toString()).toFixed(2);
    //console.log("fixedValue   ...",fixedValue)
    return fixedValue
    
  }

  removeFeature(data: any) {
    const featureArray = this.addDynamicElementNew.get('feature') as FormArray; // Get the nested FormArray
    if(data>=0){
      featureArray.removeAt(data);
    }
   
  }

  removeFAQ(data: any) {
    const faqArray = this.addFAQArrayNew.get('faq') as FormArray; // Get the nested FormArray
    if(data>=0){
    faqArray.removeAt(data);
    }
  
  }

  removeApp(data: any) {
    const appArray = this.addAppArrayNew.get('app') as FormArray; // Get the nested FormArray
    if(data>=0){
    appArray.removeAt(data);
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

  public tempYerpPrice:any;
  public tempMerpPrice : any;


  public calDiscountedVal(erp,calVal){
    return ((erp-calVal)/erp)*100;
  }

  public onPriceChange(val){


    switch (val) {
      case 'yerpPrice':
        this.tempYerpPrice = ((Number(this.registrationForm.value.yerpPrice)) * 0.02) + (Number(this.registrationForm.value.ydistributorPrice));
        this.registrationForm.controls['ydiscount'].setValue(this.calDiscountedVal(this.registrationForm.value.yerpPrice, this.tempYerpPrice).toFixed(2));
        return;
      case 'merpPrice':
        this.tempMerpPrice = ((Number(this.registrationForm.value.merpPrice)) * 0.02) + (Number(this.registrationForm.value.mdistributorPrice));
        this.registrationForm.controls['mdiscount'].setValue(this.calDiscountedVal(this.registrationForm.value.merpPrice, this.tempMerpPrice).toFixed(2));
        return;
      case 'yerpPrice1':
        this.temp1YerpPrice = ((Number(this.registrationForm.value.yerpPrice1)) * 0.02) + (Number(this.registrationForm.value.ydistributorPrice1));
        this.registrationForm.controls['ydiscount1'].setValue(this.calDiscountedVal(this.registrationForm.value.yerpPrice1, this.temp1YerpPrice).toFixed(2));
        return;
      case 'yerpPrice3':
        this.temp3YerpPrice = ((Number(this.registrationForm.value.yerpPrice3)) * 0.02) + (Number(this.registrationForm.value.ydistributorPrice3));
        this.registrationForm.controls['ydiscount3'].setValue(this.calDiscountedVal(this.registrationForm.value.yerpPrice3, this.temp3YerpPrice).toFixed(2));
        return;
      case 'yerpPriceL':
        this.tempLYerpPrice = ((Number(this.registrationForm.value.yerpPriceL)) * 0.02) + (Number(this.registrationForm.value.ydistributorPriceL));
        this.registrationForm.controls['ydiscountL'].setValue(this.calDiscountedVal(this.registrationForm.value.yerpPriceL, this.tempLYerpPrice).toFixed(2));
        return;
      case 'yerpPriceE':
        this.tempEYerpPrice = ((Number(this.registrationForm.value.yerpPriceE)) * 0.02) + (Number(this.registrationForm.value.ydistributorPriceE));
        this.registrationForm.controls['ydiscountE'].setValue(this.calDiscountedVal(this.registrationForm.value.yerpPriceE, this.tempEYerpPrice).toFixed(2));
        return;         

      default:
        return null;
    }
  }

  toggleDataDisplay(event:any){
    this.showData =event.target.checked;
  }
 
  onCheckboxChange(checkedCheckbox: HTMLInputElement, otherCheckbox: HTMLInputElement): void { 
    if (checkedCheckbox.id === 'perpetualCheckbox') {
      otherCheckbox.checked = checkedCheckbox.checked;
    }
  }
 

  /*onCheckIsPerpetual(event: Event): void {
    this.isPerpetual = (event.target as HTMLInputElement).checked;
  }
  onPerpetualSelected(checkbox: HTMLInputElement): void {
    this.isPerpetual = checkbox.checked;
  }*/
}