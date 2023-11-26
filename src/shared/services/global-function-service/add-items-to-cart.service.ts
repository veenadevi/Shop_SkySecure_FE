import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserCartRequestModel } from 'src/shared/models/concrete/user-cart.model';
import { CartStore } from 'src/shared/stores/cart.store';
import { UserAccountStore } from 'src/shared/stores/user-account.store';
import { CartService } from '../cart.service';
import { forkJoin, switchMap } from 'rxjs';
import { ToasterNotificationService } from '../toaster-notification.service';

@Injectable({ providedIn: 'root' })
export class AddItemsToCartService {
  
  constructor(
    private userAccountStore : UserAccountStore,
    private cartStore : CartStore,
    private spinner: NgxSpinnerService,
    private cartService : CartService,
    private toaster : ToasterNotificationService
  ) {
  }

/**
 * 
 * Function for adding Items to Cart
 */

public addItemsToCart(data : any) : void {
    
    //console.log("---in cart service ----",data.params)
   
    if(data.productId){
   // console.log("++++_______ Came Here If", data);
      this.getCartItems(false, data);
    }
    else if(data.productVariant){
  //console.log("++++_______ Came Here Else", data);
      this.getCartItems(true, data);
    }
        
}


public getCartItems(multipleProduct, data) : void {

    let userAccountdetails = this.userAccountStore.getUserDetails();
    let cartRefId = this.cartStore.getCartRefreneceId();
    let productsList = this.cartStore.getProductListItems() ? this.cartStore.getProductListItems() : [];


   // console.log("is user already have cart?====",cartRefId)
   // console.log("=====productsList to addcart ===",productsList.length)

    let req = new UserCartRequestModel({
      userId : userAccountdetails._id,
      createdBy : userAccountdetails._id,
      updatedBy : userAccountdetails._id,
      products : productsList
    });

    if(multipleProduct){
      
    //  console.log("+++++++ Inside Multiple");
      //let productVariant = JSON.parse(this.params.get('productVariant'));
      let productVariant = data.productVariant;
      
      let productListArray = productVariant.requiredAddOns;
      

  
      productsList.push({
        "productId": productVariant._id,
        "productName" : productVariant.name,
        "quantity" : productVariant.quantity,
        "price" : (productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].price : '',
        "erpPrice":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].ERPPrice : '',
        "discountRate":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].discountRate : '',
        "priceType":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].priceType : '',
        "distributorPrice" :(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].distributorPrice : '',
        "priceList" : productVariant.priceList ? productVariant.priceList : ''
      })

      if(productListArray.requiredBundles.length > 0){
        productListArray.requiredBundles.forEach(item => {
          var index = productsList.findIndex(el => el.productId === item._id);
         
          if(index >=0){
            productsList[index].quantity = Number(productsList[index].quantity) + 1;
          }
          else {
            productsList.push({
              "productId": item._id,
              "productName" : item.name,
              "quantity" : item.quantity,
              "price" : item.priceList.length>0 ? item.priceList[0].price  : '',
              "erpPrice":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].ERPPrice : '',
              "discountRate":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].discountRate : '',
              "priceType":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].priceType : '',
              "distributorPrice":(productVariant && productVariant.priceList.length>0) ? productVariant.priceList[0].distributorPrice : '',
              "priceList" : productVariant.priceList ? productVariant.priceList : ''
         
            });
          }
        });
      }
      if(productListArray.requiredProductVariants.length>0){
        productListArray.requiredProductVariants.forEach(item => {
          var index = productsList.findIndex(el => el.productId === item._id);
          
          if(index >=0){
            productsList[index].quantity = Number(productsList[index].quantity) + 1;
          }
          else {
            productsList.push({
              "productId": item._id,
              "productName" : item.name,
              "quantity" : item.quantity,
              "price" : item.priceList.length>0 ? item.priceList[0].price : '',
              "erpPrice":item.item.priceList[0].erpPrice,
              "discountRate":item.item.priceList[0].discountRate,
              "priceType":item.item.priceList[0].discountRate,
              "distributorPrice":data.distributorPrice,
              "priceList" : productVariant.priceList ? productVariant.priceList : ''
          });
          }
        });
      }
    }

    else{

      //console.log("came to cart service ",productsList.length)
      //var index = productsList.findIndex(el => el.productId === this.params.get('productId'));
      var index = productsList.findIndex(el => el.productId === data.productId && el.priceType===data.priceType);

      
      if(index >=0){
        //productsList[index].quantity = Number(productsList[index].quantity) + Number(this.params.get('quantity'));

        if( productsList[index].priceType===data.priceType){
        //  console.log("=====increase as same priceType====")
          productsList[index].quantity = Number(productsList[index].quantity) + Number(data.quantity);
          productsList[index].priceList = data.priceList
        }
       else{
        productsList.push({
          /*"productId": this.params.get('productId'),
          "productName" : this.params.get('productName'),
          "quantity" : this.params.get('quantity'),
          "price" : this.params.has('price') ? this.params.get('price') : '',
          "erpPrice" : this.params.get('erpPrice'),
          "discountRate" : this.params.get('discountRate'),
          "priceType" : this.params.get('priceType')*/
          "productId": data.productId,
          "productName" : data.productName,
          "quantity" : data.quantity,
          "price" : data.price ? data.price : '',
          "erpPrice" : data.erpPrice,
          "discountRate" : data.discountRate,
          "priceType" : data.priceType,
          "distributorPrice":data.distributorPrice,
          "priceList" : data.priceList ? data.priceList : ''
        });
       }
     //  console.log(")_)_)_)_)_)_)_ Inside else ", productsList);

      }
      else {
        productsList.push({
          /*"productId": this.params.get('productId'),
          "productName" : this.params.get('productName'),
          "quantity" : this.params.get('quantity'),
          "price" : this.params.has('price') ? this.params.get('price') : '',
          "erpPrice" : this.params.get('erpPrice'),
          "discountRate" : this.params.get('discountRate'),
          "priceType" : this.params.get('priceType')*/
          "productId": data.productId,
          "productName" : data.productName,
          "quantity" : data.quantity,
          "price" : data.price ? data.price : '',
          "erpPrice" : data.erpPrice,
          "discountRate" : data.discountRate,
          "priceType" : data.priceType,
          "distributorPrice":data.distributorPrice,
          "priceList" : data.priceList ? data.priceList : ''

       
        });
        //console.log(")_)_)_)_)_)_)_ Inside else If", productsList);
      }

      if(cartRefId !== '' || cartRefId !== null){
        req.cart_ref_id = cartRefId;
        //req.products.push(productsList);
        req.products = productsList;
      }
      else {
        req.products.push(productsList);
      }

   //   console.log("+++++++ Final Price ", req);
  
      //console.log("+_+_+_+_+_+_ ", this.addCartItemsService(req, 'add'));
      this.addCartItemsService(req, 'add');

    }

}

public addCartItemsService(req, state) {

  console.log("addCartItemsService=====req  ",req)

  this.spinner.show();
  this.cartService.addCartItems(req)
      .pipe(
        //Use switchMap to call another API(s)
        switchMap((dataFromServiceOne) => {
          //Lets map so to an observable of API call
          const allObs$ = this.cartService.getCartItems(null);

      console.log("to add product to cart===")
          //forkJoin will wait for the response to come for all of the observables
          this.spinner.hide();
          this.toaster.showSuccess("The product has been added to Cart",'')
          return forkJoin(allObs$);
        })
      ).subscribe((forkJoinResponse) => {
       // console.log("+_)(*&^^ ^", forkJoinResponse);
       // this.spinner.hide();
       // this.toaster.showSuccess("The product has been added to Cart",'')
        //forkJoinResponse will be an array of responses for each of the this.serviceTwo.getAllServiceTwoData CALL
        //Do whatever you want to do with this array
      
      });
}




 


  


}