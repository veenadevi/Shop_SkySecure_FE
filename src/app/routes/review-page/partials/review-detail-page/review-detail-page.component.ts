import { Component , Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review-detail-page',
  templateUrl: './review-detail-page.component.html',
  styleUrls: ['./review-detail-page.component.css']
})
export class ReviewDetailPageComponent {
  @Input() maxRating = 5;
  @Input() selectedRating = -0;
  @Input() selectedRating01 = -0;
  @Input() selectedRating02 = -0;
  @Input() selectedRating03 = -0;
  @Input() selectedRating04 = -0;
  @Output() ratingChanged = new EventEmitter<number>();

  stars: number[];

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_, index) => index + 1);
  }

  rate(rating: number) {
    this.selectedRating = rating;
    this.ratingChanged.emit(rating);
  }
  rate01(rating: number) {
    this.selectedRating01 = rating;
    this.ratingChanged.emit(rating);
  }
  rate02(rating: number) {
    this.selectedRating02 = rating;
    this.ratingChanged.emit(rating);
  }
  rate03(rating: number) {
    this.selectedRating03 = rating;
    this.ratingChanged.emit(rating);
  }
  rate04(rating: number) {
    this.selectedRating04 = rating;
    this.ratingChanged.emit(rating);
  }
}
