import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCarttComponent } from './manage-cartt.component';

describe('ManageCarttComponent', () => {
  let component: ManageCarttComponent;
  let fixture: ComponentFixture<ManageCarttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCarttComponent]
    });
    fixture = TestBed.createComponent(ManageCarttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
