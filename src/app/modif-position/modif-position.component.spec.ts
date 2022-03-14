import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifPositionComponent } from './modif-position.component';

describe('ModifPositionComponent', () => {
  let component: ModifPositionComponent;
  let fixture: ComponentFixture<ModifPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
