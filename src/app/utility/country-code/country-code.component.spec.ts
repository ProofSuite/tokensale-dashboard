import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCodeComponent } from './country-code.component';

describe('CountryCodeComponent', () => {
  let component: CountryCodeComponent;
  let fixture: ComponentFixture<CountryCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
