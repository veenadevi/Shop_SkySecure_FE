import { CategoryDetails } from "../interface/partials/category-details";



export class CategoryDetailsModel implements CategoryDetails {
  
    public _id: string;
    public name: string;
    public description: string;
    public createdBy: string;
    public updatedBy: string;
    public createdAt: Date;
    public updatedAt: Date;
    public __v: number;
    public imageURL :string ;
    public parentCategoryId:string ;
    public subCategories: Array<any>;



  constructor(args : Partial<CategoryDetailsModel>) {
    Object.assign(this, args);
  }

}