import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
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
}
