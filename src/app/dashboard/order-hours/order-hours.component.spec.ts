import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHoursComponent } from './order-hours.component';

describe('OrderHoursComponent', () => {
  let component: OrderHoursComponent;
  let fixture: ComponentFixture<OrderHoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHoursComponent]
    });
    fixture = TestBed.createComponent(OrderHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
