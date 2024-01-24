import { Component } from '@angular/core';

@Component({
  selector: 'app-my-cart-list',
  templateUrl: './my-cart-list.component.html',
  styleUrls: ['./my-cart-list.component.scss']
})
export class MyCartListComponent {
  currentValue: number = 22;
  incrementValue() {
    this.currentValue += 1;
  }

  decrementValue() {
    this.currentValue -= 1;
  }
}
