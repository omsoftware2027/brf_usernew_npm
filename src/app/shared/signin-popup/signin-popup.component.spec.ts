import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPopupComponent } from './signin-popup.component';

describe('SigninPopupComponent', () => {
  let component: SigninPopupComponent;
  let fixture: ComponentFixture<SigninPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninPopupComponent]
    });
    fixture = TestBed.createComponent(SigninPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
