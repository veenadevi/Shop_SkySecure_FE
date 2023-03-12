import { ProductsDetails } from "../interface/partials/products-details";


export class ProductsDetailsModel implements ProductsDetails {
  
    public _id: string;
    public name: string;
    public description: string;
    public createdBy: string;
    public updatedBy: string;
    public createdAt: Date;
    public updatedAt: Date;
    public __v: number;

  constructor(args : Partial<ProductsDetailsModel>) {
    Object.assign(this, args);
  }

}