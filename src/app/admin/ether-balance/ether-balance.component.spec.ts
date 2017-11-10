import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtherBalanceComponent } from './ether-balance.component';

describe('EtherBalanceComponent', () => {
  let component: EtherBalanceComponent;
  let fixture: ComponentFixture<EtherBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
