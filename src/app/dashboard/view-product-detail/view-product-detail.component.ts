import { Component } from '@angular/core';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent {
  currentValue: number = 22;
  incrementValue() {
    this.currentValue += 1;
  }

  decrementValue() {
    this.currentValue -= 1;
  }
}
