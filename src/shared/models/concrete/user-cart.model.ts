import { UserCartRequest } from "../interface/request/user-cart.request";

export class UserCartRequestModel implements UserCartRequest {

  public userId : string;
  public userName : string;
  public status : string;
  public cart_ref_id : number;
  public createdBy : string;
  public updatedBy : string;
  public products : any[];

  constructor(args : Partial<UserCartRequestModel>) {
    Object.assign(this, args);
  } 

}