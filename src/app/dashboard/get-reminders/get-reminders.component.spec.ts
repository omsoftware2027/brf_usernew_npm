import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRemindersComponent } from './get-reminders.component';

describe('GetRemindersComponent', () => {
  let component: GetRemindersComponent;
  let fixture: ComponentFixture<GetRemindersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetRemindersComponent]
    });
    fixture = TestBed.createComponent(GetRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
