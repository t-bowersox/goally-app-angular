import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Goal } from 'src/app/app.types';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
})
export class GoalComponent implements OnInit {
  protected editorForm: FormGroup;
  protected goalState?: Goal;
  protected isBusy = false;

  protected get description(): AbstractControl | null {
    return this.editorForm.get('description');
  }

  // Inputs
  @Input() public goal?: Goal;
  @Input() public mode: Mode = 'read';

  // Outputs
  @Output() public updateCancelled = new EventEmitter<true>();
  @Output() public deleted = new EventEmitter<Goal>();
  @Output() public updated = new EventEmitter<Goal>();

  constructor(
    private readonly _goalsService: GoalsService,
    private readonly _router: Router,
    private readonly _matSnackBar: MatSnackBar,
  ) {
    this.editorForm = new FormGroup({
      description: new FormControl('', { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    if (this.goal) {
      this.goalState = structuredClone(this.goal);
      this.description?.setValue(this.goalState.description);
    }
  }

  protected createGoal(): void {
    this.editorForm.markAllAsTouched();

    if (this.editorForm.invalid) {
      return;
    }

    this.isBusy = true;
    this._goalsService.createGoal(this.description?.value ?? '').subscribe({
      next: () => {
        this.updated.emit(this.goalState);
        this.mode = 'read';
        this.isBusy = false;
      },
      error: async (err: HttpErrorResponse) => {
        await this._handleApiError(err);
      },
    });
  }

  protected toggleAccomplished(change: MatCheckboxChange): void {
    if (!this.goalState) {
      return;
    }

    this.goalState.accomplished = change.checked;
    this.updateGoal();
  }

  protected updateGoal(): void {
    if (!this.goalState) {
      return;
    }

    this.editorForm.markAllAsTouched();

    if (this.editorForm.invalid) {
      return;
    }

    this.isBusy = true;
    this._goalsService
      .updateGoalById(
        this.goalState.id,
        this.description?.value,
        this.goalState.accomplished,
      )
      .subscribe({
        next: () => {
          this.updated.emit(this.goalState);
          this.mode = 'read';
          this.isBusy = false;
        },
        error: async (err: HttpErrorResponse) => {
          await this._handleApiError(err);
        },
      });
  }

  protected cancelUpdate(): void {
    this.goalState = structuredClone(this.goal);
    this.updateCancelled.emit(true);
    this.mode = 'read';
  }

  protected deleteGoal(): void {
    if (!this.goalState) {
      return;
    }

    this.isBusy = true;
    this._goalsService.deleteGoalById(this.goalState.id).subscribe({
      next: () => {
        this.deleted.emit(this.goalState);
        this.isBusy = false;
      },
      error: async (err: HttpErrorResponse) => {
        await this._handleApiError(err);
      },
    });
  }

  private async _handleApiError(err: HttpErrorResponse): Promise<void> {
    if (err.status === 401) {
      await this._router.navigateByUrl('/login');
    } else {
      this.goalState = structuredClone(this.goal);
      this.isBusy = false;
      this._matSnackBar.open(
        'Sorry, something went wrong. Please refresh the page and try again.',
        'OK',
      );
    }
  }
}

// Local types

type Mode = 'create' | 'read' | 'update' | 'delete';
