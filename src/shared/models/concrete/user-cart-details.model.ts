import { UserCartDetails } from "../interface/partials/user-cart-details"


export class UserCartDetailsModel implements UserCartDetails {

  public cart_ref_id : string;
  public productId : string;
  public quantity : string;
  public createdAt : string;
  public updatedAt : string;
  public __v : string;
  public _id : string;
  

  constructor(args : Partial<UserCartDetailsModel>) {
    Object.assign(this, args);
  } 

}