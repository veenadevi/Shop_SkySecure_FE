import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'brand-features',
  templateUrl: './brand-features.component.html',
  styleUrls: ['./brand-features.component.css']
})
export class BrandFeaturesComponent implements OnInit{

    @Input('productVarientData')
    public productVarientData : any;

    public products : any[] = [];

    public features : any[] = [];

    public productVarients : any[] = [];

    public productFamilyVariants : any[] = [];

    public productFamily : any;

    public headerText : string;

    public cardItems : any[] = [];

    public featureList : any[] = [];

    public featuresCardHeadings : any[] = [];

    public varientRow : any[] = [];

    public onLoad = true;

    public featuerCardVariantFlag : string ;

    public alternateLogo = 'https://csg1003200209655332.blob.core.windows.net/images/1683273444-MicrosoftLogo_300X300.png';

    public ngOnInit(): void {

        

        this.productFamily = this.productVarientData.productFamily;
        this.productFamilyVariants = this.productVarientData.productFamilyVariants;
        this.productVarients = this.productVarientData.productVarients;
        this.products = this.productVarientData.products;
        this.featureList = this.productVarientData.features;
        this.featuresCardHeadings = this.productVarientData.featuresCardHeadings;

        this.featuerCardVariantFlag = (this.featuresCardHeadings && this.featuresCardHeadings.length>0) ? 'Y' : 'N';

        // if(this.features.length <=0 && this.featuresCardHeadings.length <=0){
        //     this.onLoad = false;
        // }


        if(this.productFamilyVariants && this.productFamilyVariants.length>0){
            this.varientRow = this.productFamilyVariants;
            this.setTableData(this.varientRow);
        }
        else{
            //this.varientRow = this.productFamily;
            this.setTableDataForSingleVarient(this.productFamily);
        }
    }



    public setTableDataForSingleVarient(varientRow){
        this.varientRow = [this.productFamily];
        //this.featureList = this.features;

        for(let i=0;i<this.varientRow.length;i++){
            this.varientRow[i]['availableFeatures'] = [];
            this.featureList.forEach(element => {
                this.varientRow[i].availableFeatures.push(element._id);
            });
        }

    }


    public setTableData(varientRow): void{

        let prdVar = varientRow;

        var a = false
        // if(this.featuresCardHeadings && this.featuresCardHeadings.length>0){
        if(a){

            for(let i=0;i<prdVar.length;i++){
                prdVar[i]['availableFeatures'] = [];
                for(let j=0;j<prdVar[i].features.length;j++){
                    var isPresent = this.featureList.some(function(el){ return el._id === prdVar[i].features[j]._id});
                    
                    if(isPresent){
                        prdVar[i].availableFeatures.push(prdVar[i].features[j]._id);
                    }
                }
            }
             
        }
        else{
            for(let i=0;i<prdVar.length;i++){
                prdVar[i]['availableFeatures'] = [];
                for(let j=0;j<prdVar[i].features.length;j++){
                    var isPresent = this.featureList.some(function(el){ return el._id === prdVar[i].features[j]._id});
                    
                    if(isPresent){
                        prdVar[i].availableFeatures.push(prdVar[i].features[j]._id);
                    }
                }
            }
        }

        
        
        

        this.varientRow = prdVar;
    }

    public onNavigateTo(link){
        const url = link;
        if(link){
          window.open(url, "'"+link+"'");
        }
        
      }
  
}
