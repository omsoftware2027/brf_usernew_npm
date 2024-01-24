import { Component } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  currentValue: number = 22;
  incrementValue() {
    this.currentValue += 1;
  }

  decrementValue() {
    this.currentValue -= 1;
  }
}
