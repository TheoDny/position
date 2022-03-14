import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemeViewComponent } from './systeme-view.component';

describe('SystemeViewComponent', () => {
  let component: SystemeViewComponent;
  let fixture: ComponentFixture<SystemeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
