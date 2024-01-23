import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyRightComponent } from './privacy-right.component';

describe('PrivacyRightComponent', () => {
  let component: PrivacyRightComponent;
  let fixture: ComponentFixture<PrivacyRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyRightComponent]
    });
    fixture = TestBed.createComponent(PrivacyRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
