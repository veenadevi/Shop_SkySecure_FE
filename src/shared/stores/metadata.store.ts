/* Angular Import */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryDetails } from '../models/interface/partials/category-details';
import { OEMDetails } from '../models/interface/partials/oem-details';
import { ProductsDetails } from '../models/interface/partials/products-details';
/* Feature Imports */



/**
 * Creates our Metadata State injectable
 * Feature specific stores are Angular Injectables extending the abstract OuxStore (i.e., class):
 */
@Injectable({ providedIn: 'root' })
export class MetadataStore {

  public categoryDetails: CategoryDetails;
  public oemDetails: OEMDetails;
  public productsDetails: ProductsDetails;
  public trendingProducts: any;
  public globalSearchBarVisibility: any;
  public productReviewDetails: any;
  public productReviewDetailsOthers: any;

  public individualProductDetail: any;


  private categoryDetailsSubject = new BehaviorSubject<CategoryDetails[]>(null);
  public categoryDetails$ = this.categoryDetailsSubject.asObservable();

  private oemDetailsSubject = new BehaviorSubject<OEMDetails[]>(null);
  public oemDetails$ = this.oemDetailsSubject.asObservable();

  private productsDetailsSubject = new BehaviorSubject<ProductsDetails[]>(null);
  public productsDetails$ = this.productsDetailsSubject.asObservable();

  private trendingProductsSubject = new BehaviorSubject<any[]>(null);
  public trendingProducts$ = this.trendingProductsSubject.asObservable();

  private individualProductDetailSubject = new BehaviorSubject<any[]>(null);
  public individualProductDetail$ = this.individualProductDetailSubject.asObservable();


  private globalSearchBarVisibilitySubject = new BehaviorSubject<any[]>(null);
  public globalSearchBarVisibility$ = this.globalSearchBarVisibilitySubject.asObservable();

  private productReviewSubject = new BehaviorSubject<any[]>(null);
  public productReviewSubject$ = this.productReviewSubject.asObservable();

  private productReviewOtherSubject = new BehaviorSubject<any[]>(null);
  public productReviewOtherSubject$ = this.productReviewOtherSubject.asObservable();


  constructor() {
  }


  /**
   * ============================================================
   * Set Product Category
   */
  public setCategoryDetails(data: CategoryDetails[]): void {

    this.categoryDetailsSubject.next(data);
  }

  /**
   * ============================================================
   * Set OEM
   */
  public setOEMDetails(data: OEMDetails[]): void {

    this.oemDetailsSubject.next(data);
  }
  /**
   * ============================================================
   * Set Products
   */
  public setProductsDetails(data: ProductsDetails[]): void {

    this.productsDetailsSubject.next(data);
  }

  /**
   * ============================================================
   * Set Trending Products
   */
  public setTrendingProducts(data: any[]): void {

    this.trendingProducts = data;
    this.trendingProductsSubject.next(data);
  }


  /**
 * ============================================================
 * Set Individual Product Detail Products
 */
  public setIndividualProductDetail(data: any): void {


    this.individualProductDetail = data;
    this.individualProductDetailSubject.next(data);
  }


  /**
 * ============================================================
 * Set Global Search Bar Visibility
 */
  public setGlobalSearchBarVisibility(data: any): void {


    this.globalSearchBarVisibility = data;
    this.globalSearchBarVisibilitySubject.next(data);
  }


  /**
* ============================================================
* Set Product Review Data One
*/
  public setProductReviewDetails(data: any): void {

    this.productReviewDetails = data;
    this.productReviewSubject.next(data);
  }

  /**
* ============================================================
* Set Product Review Data One
*/
  public setProductReviewOtherDetails(data: any): void {

    this.productReviewDetailsOthers = data;
    this.productReviewOtherSubject.next(data);
  }



  /**
   * Return User Details
   */
  public getCategoryDetails(): CategoryDetails {
    return this.categoryDetails;
  }


  /**
   * Return OEM Details
   */
  public getOEMDetails(): OEMDetails {
    return this.oemDetails;
  }
  /**
   * Return User Details
   */
  public getProductsDetails(): ProductsDetails {
    return this.productsDetails;
  }

  /**
  * Return Trending Products Details
  */
  public getTrendingProducts(): ProductsDetails {
    return this.trendingProducts;
  }

  /**
   * Return IndividualProduct Details
   */
  public getIndividualProductDetail(): ProductsDetails {
    return this.individualProductDetail;
  }

  /**
* ============================================================
* Return Global Search Bar Visibility
*/
  public getGlobalSearchBarVisibility(): void {


    return this.globalSearchBarVisibility;
  }


  /**
* ============================================================
* Return product Review Details
*/
  public getProductReviewDetails(): any {
    return this.productReviewDetails;
  }


  /**
* ============================================================
* Return product Review Details
*/
  public getProductReviewOtherDetails(): any {
    return this.productReviewDetailsOthers;
  }


  /**
   * Clear MetaData Collection
   * ============================================================
   */
  public clearCategoryDetails(): void {

  }



}