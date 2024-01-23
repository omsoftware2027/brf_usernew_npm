import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrFoodServicesComponent } from './br-food-services.component';

describe('BrFoodServicesComponent', () => {
  let component: BrFoodServicesComponent;
  let fixture: ComponentFixture<BrFoodServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrFoodServicesComponent]
    });
    fixture = TestBed.createComponent(BrFoodServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
