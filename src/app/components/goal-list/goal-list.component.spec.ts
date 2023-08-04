import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalListComponent } from './goal-list.component';

describe('GoalListComponent', () => {
  let component: GoalListComponent;
  let fixture: ComponentFixture<GoalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GoalListComponent]
    });
    fixture = TestBed.createComponent(GoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
