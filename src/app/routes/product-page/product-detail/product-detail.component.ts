import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetadataService } from 'src/shared/services/metadata.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  products = [
    {
      title: 'Microsoft Teams',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Microsoft Azure',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Microsoft Outlook',
      solutionLink: 'Lorem Ipsum is simply dummy text',
      imageUrl: 'https://desktoptowork.com/wp-content/uploads/2021/11/Microsoft-Teams-1-1204x800.jpeg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
  ]

  private subscriptions: Subscription[] = [];
  public product : any = {};
  public onProductLoad = true;

  private getProductDetails(productId: string): void {
    this.onProductLoad = false;
    this.subscriptions.push(
       this.metaDataSvc.fetchSingleProductDetails(productId).subscribe( response => {
        this.product = { ...response.products , featureList: response.featureList } ;
        this.onProductLoad = true;
      })
    );
  }

  constructor(
    private metaDataSvc : MetadataService,
    private route: ActivatedRoute
  ){}

  public ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(productId);
  }


}
