import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent implements OnInit{

  @Input('productReviews')
  public productReviews : any;


  public reviewByValueList : any = [];

  public ngOnInit(): void {
      console.log("+_+_+_+ _:ast Page", this.productReviews);

      this.calculateReviewByValue();

     
  }

  public getratingDesc(val){

    switch (val) {
      case 1:
        return 'Terrible'
        break;
      case 2:
        return 'Poor'
        break;
      case 3:
        return 'Average'
        break;
      case 4:
        return 'Good'
        break;
      case 5:
        return 'Excellent'
        break;
    
      default:
        return ''
        break;
    }
  }

  public calculateReviewByValue(){

    

    

    for(var i=1;i<=5;i++){

      let reviewByValue = {
        'val' : null,
        'totalReviews' : null,
        'averageReview' : null,
        'totalReviewForVal' : null,
      }

      let [totalReviews, totalRatings] = this.filterByReview(i);
      reviewByValue.val = i;
      reviewByValue.totalReviews = this.productReviews.length;
      reviewByValue.totalReviewForVal = totalReviews;
      reviewByValue.averageReview = totalRatings;
      
      this.reviewByValueList.push(reviewByValue);

    }


    console.log("+_+_()() reviewlist ", this.reviewByValueList);


  }

  public filterByReview(val){


    let tempVal = this.productReviews.filter(item => item.overAllRating === val)

    

    let totalRatings = tempVal.reduce((n, {overAllRating}) => n + overAllRating, 0);

    return [tempVal.length, totalRatings];

  
  }

  public calculateOverAllRating(){

    //let num = 5.54789;
    //let n = num.toFixed(1);

    let totalOverAllRating = this.productReviews.reduce((n, {overAllRating}) => n + overAllRating, 0);
    let average = totalOverAllRating/this.productReviews.length;
    return average.toFixed(1);

  }


  public filterDataReviewValue(){

  //   return = 
  //   this.booksByStoreID = this.books.filter(
  //     book => book.store_id === this.store.id);
  }

}
