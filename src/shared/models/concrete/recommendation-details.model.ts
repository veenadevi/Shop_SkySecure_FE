import { RecommendationDetails } from "../interface/partials/recommendation-details";



export class RecommendationDetailsModel implements RecommendationDetails {
  
    public _id: string;
    public title: string;
    public details: string;
    public category: string;
    public priority: string;
    public productName: string;
    public websiteLink: string;
    public segmentationId: string;
    public createdAt: string;
    public updatedAt: string;
    public __v: number;
    public isCompleted: boolean;
    public checked: string;
    public userConfigStatus : any[];



  constructor(args : Partial<RecommendationDetailsModel>) {
    Object.assign(this, args);
  }

}