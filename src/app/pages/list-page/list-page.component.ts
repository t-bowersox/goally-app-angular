import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Goal } from 'src/app/app.types';
import { GoalsService } from 'src/app/services/goals.service';
import { GoalListComponent } from '../../components/goal-list/goal-list.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    GoalListComponent,
    MatExpansionModule,
    SpinnerComponent,
  ],
})
export class ListPageComponent {
  private _goals = new BehaviorSubject<Goal[]>([]);

  protected isLoading = true;

  protected get goalsInProgress(): Observable<Goal[]> {
    return this._goals.pipe(
      map((goals) =>
        goals.filter((g) => !g.accomplished).sort((a, b) => a.id - b.id),
      ),
    );
  }

  protected get goalsAccomplished(): Observable<Goal[]> {
    return this._goals.pipe(
      map((goals) =>
        goals.filter((g) => g.accomplished).sort((a, b) => a.id - b.id),
      ),
    );
  }

  constructor(
    private readonly _goalsService: GoalsService,
    private readonly _matSnackbar: MatSnackBar,
    private readonly _router: Router,
  ) {
    this.refreshGoals();
  }

  protected refreshGoals(): void {
    this._goalsService.getGoalsForUser().subscribe({
      next: (goals) => {
        this._goals.next(goals);
        this.isLoading = false;
      },
      error: async (err: HttpErrorResponse) => {
        this.isLoading = false;
        switch (err.status) {
          case 401:
            await this._router.navigateByUrl('/login');
            break;
          default:
            this._matSnackbar.open(
              'Sorry, something went wrong. Please refresh the page and try again.',
              'OK',
            );
        }
      },
    });
  }
}
