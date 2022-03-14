import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendeTerrainComponent } from './legende-terrain.component';

describe('LegendeTerrainComponent', () => {
  let component: LegendeTerrainComponent;
  let fixture: ComponentFixture<LegendeTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendeTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendeTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
