import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtheriumComponent } from './etherium.component';

describe('EtheriumComponent', () => {
  let component: EtheriumComponent;
  let fixture: ComponentFixture<EtheriumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtheriumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtheriumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
