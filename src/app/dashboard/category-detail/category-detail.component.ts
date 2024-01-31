import { Component } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  currentValue: number = 22;
  firstIconDisabled: boolean = true;
  secondIconDisabled: boolean = false;
  incrementValue() {
    this.currentValue += 1;
  }

  decrementValue() {
    this.currentValue -= 1;
  }
  toggleIcons(iconClicked: string) {
    // if (iconClicked === 'first') {
    //   this.secondIconDisabled = true;
    //   this.firstIconDisabled = false;
    // } else if (iconClicked === 'second') {
    //   this.firstIconDisabled = true;
    //   this.secondIconDisabled = false;
    // }
  }
}
