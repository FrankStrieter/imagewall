import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardwallComponent } from './cardwall.component';

describe('CardwallComponent', () => {
  let component: CardwallComponent;
  let fixture: ComponentFixture<CardwallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardwallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardwallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
