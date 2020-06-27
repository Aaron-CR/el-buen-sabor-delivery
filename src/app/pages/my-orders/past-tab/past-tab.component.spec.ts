import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTabComponent } from './past-tab.component';

describe('PastTabComponent', () => {
  let component: PastTabComponent;
  let fixture: ComponentFixture<PastTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
