export interface ProductsDetails{
	_id: string,
    name: string,
    description: string,
    createdBy: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    productVariants : any[]
    
}