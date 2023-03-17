import { UserDetails } from "../interface/partials/user-details";

export class UserDetailsModel implements UserDetails {

  public company : string;
  public createdAt : string;
  public createdBy : string;
  public email : string;
  public firstName : string;
  public lastName : string;
  public role : string;
  public updatedAt
  public updatedBy
  public __v : number;
  public _id : string

  constructor(args : Partial<UserDetailsModel>) {
    Object.assign(this, args);
  } 

}