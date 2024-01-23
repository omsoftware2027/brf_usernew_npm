import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatMarketsComponent } from './meat-markets.component';

describe('MeatMarketsComponent', () => {
  let component: MeatMarketsComponent;
  let fixture: ComponentFixture<MeatMarketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeatMarketsComponent]
    });
    fixture = TestBed.createComponent(MeatMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
