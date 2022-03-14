import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptJoueurComponent } from './prompt-joueur.component';

describe('PromptJoueurComponent', () => {
  let component: PromptJoueurComponent;
  let fixture: ComponentFixture<PromptJoueurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptJoueurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
