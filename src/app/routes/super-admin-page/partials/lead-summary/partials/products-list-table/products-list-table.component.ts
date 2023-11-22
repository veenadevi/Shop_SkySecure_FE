import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCompareProductModalComponent } from 'src/shared/components/modals/add-compare-product-modal/add-compare-product-modal.component';
import { InvoiceDueDateModalComponent } from 'src/shared/components/modals/invoice-due-date-modal/invoice-due-date-modal.component';
import { CartService } from 'src/shared/services/cart.service';
import { UserAccountStore } from 'src/shared/stores/user-account.store';


@Component({
  selector: 'products-list-table',
  templateUrl: './products-list-table.component.html',
  styleUrls: ['./products-list-table.component.css']
})
export class ProductsListTableComponent implements OnInit {

 

  @Input('productsData')
  public productsData: any;


  @Input('cartData')
  public cartData: any;

  @Input('crmData')
  public crmData: any;

  @Input('estimateStatus')
  public estimateStatus : any;


  @Input('assignedOwnerComments')
  public assignedOwnerComments : any;

  private opts = [
    { key: 'Year', value: "Year" },
    { key: 'Month', value: "Month" },
  ];


  public productsList: any[] = [];
  public enableEdit: boolean
  public enableinvoice:boolean
  public allowAddProduct:boolean
  public isReadOnly:boolean;

  public showMsg: boolean

  public showInvoiceMsg: boolean

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
  ) { }
  userDetails:any;

  ngOnInit(): void {
    this.isReadOnly=false
    this.enableEdit = false
    this.enableinvoice=false
    this.allowAddProduct=false
    this.userDetails = this.userAccountStore.getUserDetails();
    this.showMsg = false
    this.cartDetails = (this.cartData.CartDetails && this.cartData.CartDetails.length > 0) ? this.cartData.CartDetails : null;
   
    if(this.cartData.status==='Invoiced'){

    this.enableEdit = true
    this.enableinvoice=true
    this.allowAddProduct=true

    this.isReadOnly=true
    }

  
    this.setSampleData();
 
  }


  public setSampleData() {

    this.productListForm = this.fb.group({
      items: this.fb.array([])
    });
    this.getEmployee();

  }

  public valueChanged(event, item, type) {

this.enableinvoice=true

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
    // this.priceChanged(event,item,i:any)
  }


  public priceChanged(event, item, i) {

    this.enableEdit = false; 
    this.enableinvoice=true
    var index = this.cartDetails.findIndex(el => el.estimateLineItemId === item.get('line_items_id').value); 
    if (index >= 0) {

      

      let editedRate = item.get('bcy_rate').value; 
      let priceType = item.get('priceType').value;
      
      let calculatedDistributarPrice = item.get('distributorPrice').value 
      let calculatedERPPrice=item.get('erp_price').value 
      let calcRate = calculatedDistributarPrice;
 
      if (editedRate > calculatedERPPrice ) { 
        // console.log(editedRate,"editedRate")
        // console.log("greater than erp price") 
        item.get('bcy_rate').setErrors({ 'invalid': true });
        this.enableEdit = true;
        // console.log(editedRate,"editedRate-calculatedERPPrice",calculatedERPPrice)
      }
      
      if(editedRate < calcRate  ){
       
        item.get('bcy_rate').setErrors({ 'invalid': true });
        this.enableEdit = true;

      }
    
    }
    else { 
      let data = this.newlyAddedAppList.find(x => x._id + 'temp' === item.get('line_items_id').value);
   
      
      if (data) {

        let editedRate = item.get('bcy_rate').value;
        let calculatedDistributarPrice = data.priceList[0].distributorPrice; 
        let calculatedERPPrice=data.priceList[0].ERPPrice
        
        let calcRate = calculatedDistributarPrice;
       
        if (editedRate < calcRate ) {
       
          item.get('bcy_rate').setErrors({ 'invalid': true });
          this.enableEdit = true;
        } 
        if (editedRate > calculatedERPPrice ) { 
          item.get('bcy_rate').setErrors({ 'invalid': true });
          this.enableEdit = true;
         
        }
      }
    }

    this.valueChanged(event, item, 'bcyRate')

    //formData.form.controls['email'].setErrors({'incorrect': true});
 
  }




  getEmployee() {
   // this.enableEdit = false;

 
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
    console.log("fetch distributor for ", items.line_item_id)
    console.log("this.cartDetails  ", this.cartDetails)
    if (items.line_item_id) {


      var index = this.cartDetails.findIndex(el => el.estimateLineItemId === items.line_item_id);
    //  console.log("fetched disprice===", this.cartDetails[index].distributorPrice)

      return this.cartDetails[index].distributorPrice
    }
    else {
      return items.priceList[0].distributorPrice

    }


  }

  getPriceByType(lineItemId: any,type:String) {
 
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
    
      console.log("came as new product ==",this.newProductLists.length,"======",this.newProductLists[0])
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

  addApp() {
    this.enableinvoice=true
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
    this.enableinvoice=true
    const control = <FormArray>this.productListForm.get('items');
    control.removeAt(index);
  }

  save() {

  }

  public saveChanges() {




    let request = this.setRequestData();
    //console.log("+_+_+_+_+_ Res Data ", request);

    this.subscription.push(
      this.cartService.editQuotation(request).subscribe(res => {
        this.showMsg = true

      })
    )


  }

  public setRequestData() {

   


    

    let assignTo = this.crmData.assignTo;
    let createdBy = this.crmData.createdBy;
    let cartData = this.crmData.cartData;
    let zohoBookContactData = this.crmData.zohoBookContactData;
    let zohoCRMAccountData = this.crmData.zohoCRMAccountData;
    let zohoBookEstimateData = this.crmData.zohoBookEstimateData;


    let prdArray = this.setProductsList();
    let req = {
      "userId": this.cartData.userId,
      "createdBy": createdBy._id ? createdBy._id : '',
      "updatedBy":this.userDetails._id,
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
      "leadStatusUpdate" : this.estimateStatus,
      "leadComment" : this.assignedOwnerComments,

      "zohoEstimateId": cartData.zohoEstimateId,
      "zohoBookContactId": zohoBookContactData.contact_id,
    }

    

    return req;
  }

  public setInvoiceRequestData() {

  


    

    let assignTo = this.crmData.assignTo;
    let createdBy = this.crmData.createdBy;
    let cartData = this.crmData.cartData;
    let zohoBookContactData = this.crmData.zohoBookContactData;
    let zohoCRMAccountData = this.crmData.zohoCRMAccountData;
    let zohoBookEstimateData = this.crmData.zohoBookEstimateData;


    let prdArray = this.setProductsList();
    let req = {
      "reference_number":"",
      "updatedBy":this.userDetails._id,
      "payment_terms":"",
      "payment_terms_label": "Due on Receipt",
      "payment_options": {
          "payment_gateways": []
      },
      "customer_id": zohoBookContactData.contact_id,
      "products": prdArray,

      "contact_persons_ids": zohoBookEstimateData.contact_persons_ids,
       "is_inclusive_tax": false,


       "allow_partial_payments": false,
       "invoiced_estimate_id": cartData.zohoEstimateId,
       "billing_address_id": zohoBookContactData.billing_address.address_id,
       "shipping_address_id": zohoBookContactData.shipping_address.address_id,
       "gst_treatment": zohoBookContactData.gst_treatment,
       "gst_no": createdBy.gstinNumber,
       "place_of_supply": zohoBookContactData.shipping_address.state_code,
       "cart_ref_id": cartData.cart_ref_id,
 }

    

    return req;
  }

  public setProductsList() {

    this.productsList = [];


    this.getFormData.controls.forEach(element => {



      var index = this.cartDetails.findIndex(el => el.estimateLineItemId === element.value.line_items_id);



      if (index >= 0) {

    
        let tempArray = {
          "productId": this.cartDetails[index].productId,
          "quantity": element.value.quantity,
          "productName": this.cartDetails[index].productName,
          "price": element.value.bcy_rate,
          "erpPrice": this.cartDetails[index].erpPrice,
          "discountRate": this.cartDetails[index].discountRate,
          "priceType": element.value.priceType,
          "distributorPrice": this.cartDetails[index].distributorPrice,
          "itemTotal": element.value.bcy_rate * element.value.quantity,
          "priceList": this.cartDetails[index].priceList
        }

        this.productsList.push(tempArray);

      }
      else {



        let item = this.newlyAddedAppList.find(x => x._id + 'temp' === element.value.line_items_id);


        if (item) {
         
          let tempArray = {
            "productId": item._id,
            "quantity": element.value.quantity,
            "productName": item.name,
            "price": element.value.bcy_rate,
            "erpPrice": item.priceList[0].ERPPrice,
            "discountRate": item.priceList[0].discountRate,
            "priceType": item.priceList[0].priceType,
            "distributorPrice": item.priceList[0].distributorPrice,
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


    console.log("++++++++======== Products ", this.productsList);
    //console.log("++++++++======== Products ", this.cartDetails);


    return this.productsList;


  }
  get firstSelectOptions() {
    return this.opts.map(({ key }) => key);
  }
  public sendInvoice() {


    let request = this.setInvoiceRequestData();




    const modalRef = this.modalService.open(InvoiceDueDateModalComponent, {size: '700px', windowClass: 'invoice-due-date-modal-custom-class'});
  


    modalRef.componentInstance.request = request;
    
    modalRef.componentInstance.passedData.subscribe((res:any) => {
      
 
      this.enableEdit = true
    this.enableinvoice=true
    this.allowAddProduct=true

    })

    /*
    let request = this.setInvoiceRequestData();

    this.subscription.push(
      this.cartService.createInvoice(request).subscribe(res => {
        this.showInvoiceMsg = true

      })
    ) */


  }

  public onSelectChange(event, item) {
    this.enableinvoice=true
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
