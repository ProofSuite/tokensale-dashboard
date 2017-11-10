import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralStatusComponent } from './referral-status.component';

describe('ReferralStatusComponent', () => {
  let component: ReferralStatusComponent;
  let fixture: ComponentFixture<ReferralStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
