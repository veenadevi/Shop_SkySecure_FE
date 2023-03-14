
export interface UserCartRequest {
  
    userId : string;
    status : string;
    cart_ref_id : number;
    createdBy : string;
    updatedBy : string;
    products : any[];
}