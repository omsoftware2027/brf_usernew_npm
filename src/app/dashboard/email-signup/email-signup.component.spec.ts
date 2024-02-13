import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSignupComponent } from './email-signup.component';

describe('EmailSignupComponent', () => {
  let component: EmailSignupComponent;
  let fixture: ComponentFixture<EmailSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailSignupComponent]
    });
    fixture = TestBed.createComponent(EmailSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
