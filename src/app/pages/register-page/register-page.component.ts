import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { ApiError } from 'src/app/app.types';
import { USER_CONFIG, UserConfig } from 'src/app/providers/user.config';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  protected registrationForm: FormGroup;
  protected username: FormControl<string | null>;
  protected password: FormControl<string | null>;
  protected passwordConfirmation: FormControl<string | null>;
  protected honeypot: FormControl<string | null>;

  protected passwordMinLength: number;
  protected usernameMaxLength: number;
  protected serverValidationError = '';

  constructor(
    private readonly _matSnackBar: MatSnackBar,
    private readonly _router: Router,
    private readonly _userService: UserService,
    @Inject(USER_CONFIG) userConfig: UserConfig,
  ) {
    this.passwordMinLength = userConfig.passwordMinLength;
    this.usernameMaxLength = userConfig.usernameMaxLength;

    this.username = new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
    });

    this.password = new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    });

    this.passwordConfirmation = new FormControl('');

    this.honeypot = new FormControl('', {
      validators: [Validators.pattern(/^$/)],
    });

    this.registrationForm = new FormGroup({
      username: this.username,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      honeypot: this.honeypot,
    });
  }

  protected onSubmit(): void {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.invalid) {
      if (this.honeypot.invalid) {
        this._matSnackBar.open('Nice try, robot.');
      }

      return;
    }

    if (this.password.value !== this.passwordConfirmation.value) {
      this.passwordConfirmation.setErrors({ confirmed: true });
      return;
    }

    const username = this.username.value as string;
    const password = this.password.value as string;
    const passwordConfirmation = this.passwordConfirmation.value as string;

    this._userService
      .create(username, password, passwordConfirmation)
      .subscribe({
        next: async () => {
          this._matSnackBar.open('Success! Welcome to Goally! 🎉', 'OK');
          await this._router.navigateByUrl('/list');
        },
        error: (err: HttpErrorResponse) => {
          const apiError: ApiError = err.error;

          if (apiError.name) {
            this.serverValidationError = apiError.reason;

            const invalidControl = this.registrationForm.get(apiError.name);
            invalidControl?.setErrors({ server: true });
          } else {
            this._matSnackBar.open(
              'Sorry, something went wrong. Please refresh the page and try again.',
              'OK',
            );
          }
        },
      });
  }
}
