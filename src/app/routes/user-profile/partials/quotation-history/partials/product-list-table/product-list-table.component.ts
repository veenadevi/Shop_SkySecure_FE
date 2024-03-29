import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddCompareProductModalComponent } from 'src/shared/components/modals/add-compare-product-modal/add-compare-product-modal.component';
import { UploadpoModalComponent } from 'src/shared/components/modals/uploadpo-modal/uploadpo-modal.component';
import { CartService } from 'src/shared/services/cart.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';

@Component({
  selector: 'product-list-table',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list-table.component.css']
})
export class ProductListTableComponent {


 

  @Input('productsData')
  public productsData: any;


  @Input('cartData')
  public cartData: any;

  @Input('crmData')
  public crmData: any;

  private opts = [
    { key: 'Year', value: "Year" },
    { key: 'Month', value: "Month" },
  ];


  public productsList: any[] = [];
  public enableEdit: boolean
  public showMsg: boolean

  public cartDetails: any[] = [];
  public newProductLists: any[] = [];

  public isEstimate: Boolean
  public newProductIndex : Number=0


  public fullCartListData: any;

  public subscription: Subscription[] = [];

  userForm: FormGroup;
  public productListForm: FormGroup;
  public cartList: FormGroup;

  public newlyAddedAppList: any[] = [];
  employee = [
    {
      name: 'tuna',
      email: 'vscode@gmail.com',
      mobNumber: 12346,
      dob: new Date()
    },
    {
      name: 'node',
      email: 'nodejs@gmail.com',
      mobNumber: 1234,
      dob: new Date()
    },
    {
      name: 'google',
      email: 'google@gmail.com',
      mobNumber: 123461,
      dob: new Date()
    }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private modalService: NgbModal,
    private userAccountStore: UserAccountStore,
    public spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.enableEdit = false
    this.showMsg = false
    this.cartDetails = (this.cartData.CartDetails && this.cartData.CartDetails.length > 0) ? this.cartData.CartDetails : null;
   
  
    this.setSampleData();

  }


  public setSampleData() {

    this.productListForm = this.fb.group({
      items: this.fb.array([])
    });
    this.getEmployee();

  }

  public valueChanged(event, item, type) {


    switch (type) {
      case 'quantity':
        let quanTotal = item.get('quantity').value * item.get('bcy_rate').value;
        item.get('item_total').setValue(quanTotal.toFixed(2));
        return;

      case 'bcyRate':
        let priceTotal = item.get('quantity').value * item.get('bcy_rate').value;
        item.get('item_total').setValue(priceTotal.toFixed(2));
        return;

      default:
        return null;
    }
  }


  public priceChanged(event, item, i) {

    this.enableEdit = false;
    //item.get('line_items_id')

    var index = this.cartDetails.findIndex(el => el.estimateLineItemId === item.get('line_items_id').value);
    //var index = this.cartDetails.findIndex(el => el.estimateLineItemId === this.productsData.line_items[i].line_item_id);

    if (index >= 0) {



      let editedRate = item.get('bcy_rate').value;
  

      let priceType = item.get('priceType').value;



      let calculatedDistributarPrice = item.get('distributorPrice').value
      //this.cartDetails[index].distributorPrice;
      let calculatedERPPrice=item.get('erp_price').value
    //  this.cartDetails[index].erpPrice;

      let calcRate = calculatedDistributarPrice;

     

      if (editedRate > calculatedERPPrice ) {

        // item.get('bcy_rate').setValue(item.get('bcy_rate_original').value)
        item.get('bcy_rate').setErrors({ 'invalid': true });
        this.enableEdit = true;

      }
      if(editedRate < calcRate  ){
        item.get('bcy_rate').setErrors({ 'invalid': true });
        this.enableEdit = false;

      }
      else{
        item.get('bcy_rate').setErrors({ 'invalid': false });
        this.enableEdit = false;
      }

    }
    else {
     
      let data = this.newlyAddedAppList.find(x => x._id + 'temp' === item.get('line_items_id').value);
     
      if (data) {
        let editedRate = item.get('bcy_rate').value;
        let calculatedDistributarPrice = data.priceList[0].distributorPrice;

        let calculatedERPPrice = data.priceList[0].erp_price;

        let calcRate = calculatedDistributarPrice;

        if (editedRate < calcRate || editedRate>calculatedERPPrice) {
          //this.getFormData.controls['bcy_rate'].setErrors({'invalid': true});
          item.get('bcy_rate').setErrors({ 'invalid': true });
          this.enableEdit = true;
        }
      }
    }

    this.valueChanged(event, item, 'bcyRate')

    //formData.form.controls['email'].setErrors({'incorrect': true});

  }




  getEmployee() {
    this.enableEdit = false;

    if (this.productsData.line_items) {
      this.isEstimate = true;

      const control = <FormArray>this.productListForm.get('items');
      for (const items of this.productsData.line_items) {
        /* const grp = this.fb.group({
           name: [emp.name, Validators.required],
           email: [emp.email, [Validators.required]],
           mobNumber: [emp.mobNumber, [Validators.min(10)]],
           dob: [emp.dob, Validators.required]
         });*/
        var tempDescription = items.description
        var name = tempDescription.substring(0, tempDescription.lastIndexOf("-")).trim()
        var priceType = tempDescription.substring(tempDescription.lastIndexOf("-") + 1).trim()
     
        const grp = this.fb.group({

          name: [name, Validators.required],
          priceType: [priceType, Validators.required],
          distributorPrice: parseFloat(this.getDistributorPrice(items).toFixed(2)),
          quantity: [items.quantity, [Validators.required]],
          bcy_rate: [items.bcy_rate, [Validators.min(10)]],
          erp_price: parseFloat(this.getERPPrice(items).toFixed(2)),
          bcy_rate_original: [items.bcy_rate, [Validators.min(10)]],
          tax_name: [items.tax_name, Validators.required],
          item_total: [parseFloat((items.bcy_rate * items.quantity).toFixed(2)), Validators.required],
          line_items_id: [items.line_item_id, null]
        });
        control.push(grp);
      }
    }
    else {
      this.isEstimate = false

      this.fullCartListData = this.productsData.CartDetails;
      //const cartDetailsControl = <FormArray>this.productListForm.get('items');
    }
    // for (const items of this.cartDetailsData.line_items) {

    //    const grp = this.fb.group({
    //      name: [items.productName, Validators.required],
    //      quantity: [items.quantity, [Validators.required]],
    //      bcy_rate: [items.bcy_rate, [Validators.min(10)]],
    //      tax_name: [items.tax_name, Validators.required],
    //      item_total: [items.item_total, Validators.required],
    //    });
    //    control.push(grp);
    //  }


  }

  getDistributorPrice(items: any) {
    //console.log("fetch distributor for ", items.line_item_id)
   // console.log("this.cartDetails  ", this.cartDetails)
    if (items.line_item_id) {


      var index = this.cartDetails.findIndex(el => el.estimateLineItemId === items.line_item_id);
      //console.log("fetched disprice===", this.cartDetails[index].distributorPrice)

      return this.cartDetails[index].distributorPrice
    }
    else {
      return items.priceList[0].distributorPrice

    }


  }

  getPriceByType(lineItemId: any,type:String) {
    //console.log("fetch distributor for getPriceByType  ", lineItemId.value)
   // console.log("this.cartDetails in  getPriceByType", this.cartDetails)
    if (lineItemId) {
      var index = this.cartDetails.findIndex(el => el.estimateLineItemId === lineItemId.value);
      if(index>=0){

    
     
      if(type==='Month'){

       

        return this.cartDetails[index].priceList[1]
      }
      else{
        return this.cartDetails[index].priceList[0]
      }
    }

    else {
    
 
      if(type==='Month'){

       
        return this.newProductLists[0].priceList[1]
      }
      else{
        return this.newProductLists[0].priceList[0]
      }

    }
  }


  }

  getERPPrice(items: any) {
  
    if (items.line_item_id) {


      var index = this.cartDetails.findIndex(el => el.estimateLineItemId === items.line_item_id);
 

      return this.cartDetails[index].erpPrice
    }
    else {
      return items.priceList[0].erpPrice

    }


  }

  initiatForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required]],
      priceType: ['', [Validators.required]],
      distributorPrice: ['', null],
      erp_price: ['', null],
      bcy_rate: ['', [Validators.min(10)]],
      tax_name: ['', Validators.required],
      item_total: ['', Validators.required],
      line_items_id: ['', null]
    });
  }

  createNewAppWithValues(data): FormGroup {

    let priceListValues = data.priceList[0];
    this.newProductLists.push(data)

    return this.fb.group({
      name: [data.name, Validators.required],
      quantity: [1, [Validators.required]],
      priceType: ['Year', [Validators.required]],
      distributorPrice: [parseFloat(priceListValues.distributorPrice).toFixed(2), [Validators.min(10)]],
      erp_price: [parseFloat(priceListValues.ERPPrice).toFixed(2), [Validators.min(10)]],
      bcy_rate: [parseFloat(priceListValues.price.toFixed(2)), [Validators.min(10)]],
      tax_name: ['', null],
      item_total: [priceListValues.price, null],
      line_items_id: [data._id + 'temp']
    });
  }

  get getFormData(): FormArray {
    return <FormArray>this.productListForm.get('items');
  }



  uploadPo(modalType: string){
    const modalRef = this.modalService.open(  UploadpoModalComponent, { size: 'md', windowClass: 'add-compare-products-custom-class' });
  }
  addApp(modalType: string) {

    const modalRef = this.modalService.open(AddCompareProductModalComponent, { size: 'lg', windowClass: 'add-compare-products-custom-class' });
    let queryParams = {
      "screen": 'edit-product-in-accounts',
      "productLists": this.newlyAddedAppList
    }
    modalRef.componentInstance.request = queryParams;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {



      let control = <FormArray>this.productListForm.get('items');
      //control.push(this.initiatForm());



      control.push(this.createNewAppWithValues(receivedEntry));
      this.newlyAddedAppList.push(receivedEntry);


    })


  }

  remove(index: number) {
    const control = <FormArray>this.productListForm.get('items');
    control.removeAt(index);
  }

  save() {

  }

  public saveChanges() {

   


    let request = this.setRequestData();
  // console.log("+_+_+_+_+_ edit qupte Data ", request);

    this.subscription.push(
      this.cartService.editQuotation(request).subscribe(res => {
        this.showMsg = true

      })
    )
    history.back()

  }

  public setRequestData() {
    let userAccountdetails = this.userAccountStore.getUserDetails();



    let assignTo = this.crmData.assignTo;
    let createdBy = this.crmData.createdBy;
    let updatedBy = userAccountdetails._id;
    let cartData = this.crmData.cartData;
    let zohoBookContactData = this.crmData.zohoBookContactData;
    let zohoCRMAccountData = this.crmData.zohoCRMAccountData;
    let zohoBookEstimateData = this.crmData.zohoBookEstimateData;


    let prdArray = this.setProductsList();
    let req = {
      "userId": this.cartData.userId,
      "createdBy": createdBy._id ? createdBy._id : '',
      "updatedBy":updatedBy,
      "products": prdArray,
      /*"products": [
          {
              "productId": "65088f6d609bfd4be5b75028",
              "quantity": "2",
              "productName": "Microsoft Entra ID P1 (Azure Active Directory Premium P1)",
              "price": 4873.900000000001,
              "erpPrice": 5640,
              "discountRate": "19",
              "priceType": "Yearly",
              "distributorPrice": 4761.1,
              "itemTotal": 9747.800000000001
          },
          {
              "productId": "65088fda609bfd4be5b750e0",
              "quantity": "1",
              "productName": "Microsoft Entra ID P2 (Azure Active Directory Premium P2)",
              "price": 6498.2,
              "erpPrice": 8460,
              "discountRate": "25",
              "priceType": "Yearly",
              "distributorPrice": 6329,
              "itemTotal": 6498.2
          }
      ],*/
      "companyName": createdBy.companyBusinessName ? createdBy.companyBusinessName : '',
      "cart_ref_id": cartData.cart_ref_id,
      "billing_address": {
        "attention": "name", //Check
        "address": createdBy.fullAddress[0].address1,
        "street2": createdBy.fullAddress[0].address2,
        "state_code": createdBy.fullAddress[0].state,
        "city": "Bengaluru", //Check
        "state": "Karnataka", //Check
        "zip": createdBy.fullAddress[0].pincode,
        "country": createdBy.fullAddress[0].countryCode,
        "phone": createdBy.mobileNumber
      },
      "currency_id": "1014673000000000064", //Check
      "RequestingForOther": false, //Check
      "contact_persons": [
        {
          "first_name": zohoBookEstimateData.contact_persons[0].first_name,
          "email": zohoBookEstimateData.contact_persons[0].email,
          "phone": zohoBookEstimateData.contact_persons[0].phone?zohoBookEstimateData.contact_persons[0].phone:zohoBookEstimateData.contact_persons[0].mobile,
          "is_primary_contact": true, //check
          "enable_portal": false //check
        }
      ],
      "gst_no": createdBy.gstinNumber,
      "gst_treatment": zohoBookContactData.gst_treatment,

      "zohoAccountNo": zohoCRMAccountData.accountId,

      "zohoEstimateId": cartData.zohoEstimateId,
      "zohoBookContactId": zohoBookContactData.contact_id
    }

    //console.log("++++++++======== req ", req);

    return req;
  }

  public setProductsList() {

    this.productsList = [];


    this.getFormData.controls.forEach(element => {

 


      var index = this.cartDetails.findIndex(el => el.estimateLineItemId === element.value.line_items_id);
     
      var priceIndex=0
      if (index >= 0) {
        if(element.value.priceType==='Month'){
          priceIndex=1
        }
     
        let tempArray = {
          "productId": this.cartDetails[index].productId,
          "quantity": element.value.quantity,
          "productName": this.cartDetails[index].productName,
          "price": element.value.bcy_rate,
          "erpPrice": this.cartDetails[index].priceList[priceIndex].ERPPrice,
          "discountRate": this.cartDetails[index].priceList[priceIndex].discountRate,
          "priceType": element.value.priceType,
          "distributorPrice": this.cartDetails[index].priceList[priceIndex].distributorPrice,
          "itemTotal": element.value.bcy_rate * element.value.quantity,
          "priceList": this.cartDetails[index].priceList
        }

        this.productsList.push(tempArray);

      }
      else {

    //console.log("cominf for new products====")

        let item = this.newlyAddedAppList.find(x => x._id + 'temp' === element.value.line_items_id);
        var priceIndex=0

        if (item) {
          if(element.value.priceType==='Month'){
            priceIndex=1
          }
       
          let tempArray = {
            "productId": item._id,
            "quantity": element.value.quantity,
            "productName": item.name,
            "price": element.value.bcy_rate,
            "erpPrice": item.priceList[priceIndex].ERPPrice,
            "discountRate": item.priceList[priceIndex].discountRate,
            "priceType": element.value.priceType,
            "distributorPrice": item.priceList[priceIndex].distributorPrice,
            "itemTotal": element.value.bcy_rate * element.value.quantity,
            "priceList":item.priceList

          }

          this.productsList.push(tempArray);
        }

        else {
          let item2 = this.newlyAddedAppList.find(x => x._id === element.value.line_items_id);
          if (item2) {
            let tempArray = {
              "productId": item2._id,
              "quantity": element.value.quantity,
              "productName": item2.name,
              "price": element.value.bcy_rate,
              "erpPrice": item2.priceList[0].ERPPrice,
              "discountRate": item2.priceList[0].discountRate,
              "priceType": item2.priceList[0].priceType,
              "distributorPrice": item2.priceList[0].distributorPrice,
              "itemTotal": element.value.bcy_rate * element.value.quantity
            }

            this.productsList.push(tempArray);
          }
        }


      }

    });





    return this.productsList;


  }
  get firstSelectOptions() {
    return this.opts.map(({ key }) => key);
  }


  public onSelectChange(event, item) {
    var type=event.target.value;


    var lineItemId=item.get('line_items_id')



    switch (type) {
      case 'Month':
        let currentPrice=this.getPriceByType(lineItemId,type )
      
        let quanTotal = item.get('quantity').value * currentPrice.price;
        item.get('bcy_rate').setValue(currentPrice.price);
        item.get('distributorPrice').setValue(currentPrice.distributorPrice);
        item.get('erp_price').setValue(currentPrice.ERPPrice);
        item.get('item_total').setValue(quanTotal.toFixed(2));
        return;

      case 'Year':
        let currentPrice1=this.getPriceByType(lineItemId,type )
       
        let quanTotal1 = item.get('quantity').value * currentPrice1.price;
        item.get('bcy_rate').setValue(currentPrice1.price);
        item.get('distributorPrice').setValue(currentPrice1.distributorPrice);
        item.get('erp_price').setValue(currentPrice1.ERPPrice);
        item.get('item_total').setValue(quanTotal1.toFixed(2));
        return;

      default:
        return null;
    }



  }

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    if (key === '-') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '+') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '/') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '*') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === '.') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
  
    if (key === 'e') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
    if (key === 'E') {
      event.preventDefault(); // Prevent the negative sign from being entered
    }
  }


}

