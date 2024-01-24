import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  currentValue: number = 22;
  incrementValue() {
    this.currentValue += 1;
  }

  decrementValue() {
    this.currentValue -= 1;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
