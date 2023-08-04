import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsService } from 'src/app/services/goals.service';
import { GoalComponent } from './goal.component';

describe('GoalComponent', () => {
  let component: GoalComponent;
  let fixture: ComponentFixture<GoalComponent>;
  let goalsServiceSpy: jasmine.SpyObj<GoalsService>;

  beforeEach(() => {
    goalsServiceSpy = jasmine.createSpyObj('GoalsService', [
      'createGoal',
      'updateGoalById',
      'deleteGoalById',
    ]);

    TestBed.configureTestingModule({
      imports: [GoalComponent],
      providers: [{ provide: GoalsService, useValue: goalsServiceSpy }],
    });
    fixture = TestBed.createComponent(GoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
