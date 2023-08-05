import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private _target: string;

  protected loginForm: FormGroup;
  protected username: FormControl<string | null>;
  protected password: FormControl<string | null>;
  protected honeypot: FormControl<string | null>;

  constructor(
    private readonly _authService: AuthService,
    private readonly _matSnackBar: MatSnackBar,
    private readonly _router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    this._target =
      activatedRoute.snapshot.queryParamMap.get('target') ?? '/list';
    this.username = new FormControl('', { validators: [Validators.required] });
    this.password = new FormControl('', { validators: [Validators.required] });
    this.honeypot = new FormControl('', {
      validators: [Validators.pattern(/^$/)],
    });
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
      honeypot: this.honeypot,
    });
  }

  protected onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      if (this.honeypot.invalid) {
        this._matSnackBar.open('Nice try, robot.');
      }

      return;
    }

    const username = this.username.value as string;
    const password = this.password.value as string;

    this._authService.login(username, password).subscribe({
      next: async () => {
        await this._router.navigateByUrl(this._target);
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this._matSnackBar.open(
              'No account matches those credentials',
              'OK',
            );
            break;
          case 429:
            this._matSnackBar.open(
              'Too many login attempts. Please wait several minutes and try again.',
              'OK',
            );
            break;
          default:
            this._matSnackBar.open(
              'Sorry, something went wrong. Please refresh the page and try again.',
              'OK',
            );
        }

        this._resetForm();
      },
    });
  }

  private _resetForm(): void {
    this.loginForm.reset();
    this.username.setErrors(null);
    this.password.setErrors(null);
  }
}
