import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagecontainerComponent } from './imagecontainer.component';

describe('ImagecontainerComponent', () => {
  let component: ImagecontainerComponent;
  let fixture: ComponentFixture<ImagecontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagecontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagecontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
