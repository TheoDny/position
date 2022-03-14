import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainItemComponent } from './terrain-item.component';

describe('TerrainItemComponent', () => {
  let component: TerrainItemComponent;
  let fixture: ComponentFixture<TerrainItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerrainItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
