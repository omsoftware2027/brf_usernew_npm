import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailComplatedComponent } from './order-detail-complated.component';

describe('OrderDetailComplatedComponent', () => {
  let component: OrderDetailComplatedComponent;
  let fixture: ComponentFixture<OrderDetailComplatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailComplatedComponent]
    });
    fixture = TestBed.createComponent(OrderDetailComplatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
