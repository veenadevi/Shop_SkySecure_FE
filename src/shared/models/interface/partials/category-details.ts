export interface CategoryDetails{
	_id: string,
    name: string,
    description: string,
    createdBy: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    imageURL :string,
    parentCategoryId:string,
    subCategories: Array<any>
}