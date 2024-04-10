import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProductPopupComponent } from './change-product-popup.component';

describe('ChangeProductPopupComponent', () => {
  let component: ChangeProductPopupComponent;
  let fixture: ComponentFixture<ChangeProductPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeProductPopupComponent]
    });
    fixture = TestBed.createComponent(ChangeProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
