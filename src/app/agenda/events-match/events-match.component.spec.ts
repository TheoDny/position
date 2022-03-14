import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMatchComponent } from './events-match.component';

describe('EventsMatchComponent', () => {
  let component: EventsMatchComponent;
  let fixture: ComponentFixture<EventsMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
