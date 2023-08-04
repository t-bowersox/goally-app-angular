import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Goal } from 'src/app/app.types';
import { ScrollIntoViewDirective } from 'src/app/directives/scroll-into-view.directive';
import { GoalComponent } from '../goal/goal.component';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
  imports: [
    CommonModule,
    MatListModule,
    GoalComponent,
    MatDividerModule,
    ScrollIntoViewDirective,
  ],
})
export class GoalListComponent {
  private _mode: Mode = 'view';

  protected newGoal?: Goal;

  // Inputs
  @Input() public goals: Goal[] | null = null;
  @Input()
  public get mode(): Mode {
    return this._mode;
  }

  public set mode(value: Mode) {
    if (value === 'add') {
      this.newGoal = {
        id: 0,
        user_id: 0,
        description: '',
        accomplished: false,
        created_at: '',
        updated_at: '',
      };
      this.goals?.push(this.newGoal);
    }
    this._mode = value;
  }

  // Outputs
  @Output() public goalUpdated = new EventEmitter<Goal>();
  @Output() public goalDeleted = new EventEmitter<Goal>();

  protected onUpdateCancelled(): void {
    if (this.newGoal) {
      delete this.newGoal;
    }

    this.mode = 'view';
  }

  protected onGoalUpdated(goal: Goal): void {
    if (this.newGoal) {
      delete this.newGoal;
    }

    this.mode = 'view';
    this.goalUpdated.emit(goal);
  }
}

// Local types

type Mode = 'add' | 'view';
