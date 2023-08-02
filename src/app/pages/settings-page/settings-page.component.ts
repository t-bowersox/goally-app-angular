import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, first } from 'rxjs';
import { ApiError, User } from 'src/app/app.types';
import { USER_CONFIG, UserConfig } from 'src/app/providers/user.config';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  protected currentUser: Observable<User | null>;
  protected usernameForm: FormGroup;
  protected usernameMaxLength: number;
  protected passwordForm: FormGroup;
  protected passwordMinLength: number;
  protected passwordValidationError = '';
  protected usernameValidationError = '';

  protected get username(): AbstractControl | null {
    return this.usernameForm.get('username');
  }

  protected get newPassword(): AbstractControl | null {
    return this.passwordForm.get('newPassword');
  }

  protected get newPasswordConfirmation(): AbstractControl | null {
    return this.passwordForm.get('newPasswordConfirmation');
  }

  @ViewChild('passwordFormEl')
  private _passwordFormEl?: ElementRef<HTMLFormElement>;

  @ViewChild('usernameFormEl')
  private _usernameFormEl?: ElementRef<HTMLFormElement>;

  constructor(
    private readonly _matSnackBar: MatSnackBar,
    private readonly _userService: UserService,
    @Inject(USER_CONFIG) userConfig: UserConfig,
  ) {
    this.currentUser = this._userService.currentUser;
    this.usernameMaxLength = userConfig.usernameMaxLength;
    this.passwordMinLength = userConfig.passwordMinLength;

    this.usernameForm = new FormGroup({
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(this.usernameMaxLength),
        ],
      }),
      currentPassword: new FormControl('', {
        validators: [Validators.required],
      }),
    });

    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
        ],
      }),
      newPasswordConfirmation: new FormControl(''),
      currentPassword: new FormControl('', {
        validators: [Validators.required],
      }),
    });

    this._resetUsernameValue();
  }

  private _resetUsernameValue(): void {
    this.currentUser.pipe(first((user) => !!user)).subscribe((user) => {
      this.username?.setValue(user?.username);
    });
  }

  /**
   * Tries to fully reset a form's values and submission state.
   *
   * Calling a form control's `reset()` method does not clear the validation
   * status of its fields (i.e. required fields will become instantly
   * invalid). You must instead call `reset()` on the native form element.
   */
  private _tryResetFormState(
    form: ElementRef<HTMLFormElement> | undefined,
  ): void {
    form?.nativeElement.reset();
  }

  protected restoreUsername(): void {
    setTimeout(() => this._resetUsernameValue());
  }

  protected saveUsername(): void {
    this.usernameForm.markAllAsTouched();

    if (this.usernameForm.invalid) {
      return;
    }

    const username = this.username?.value;
    const currentPassword = this.usernameForm.get('currentPassword')?.value;

    if (!username || !currentPassword) {
      return;
    }

    this._userService.updateUsername(username, currentPassword).subscribe({
      next: () => {
        this._matSnackBar.open(
          'Success! Your username has been updated.',
          'OK',
        );
        this._tryResetFormState(this._usernameFormEl);
        this.restoreUsername();
      },
      error: (err: HttpErrorResponse) => {
        const apiError: ApiError = err.error;

        switch (err.status) {
          case 400:
            this._matSnackBar.open('You did not make any changes.', 'OK');
            this._tryResetFormState(this._usernameFormEl);
            this.restoreUsername();
            break;
          case 401:
            this.usernameForm
              .get('currentPassword')
              ?.setErrors({ server: true });
            break;
          case 422:
            this._resetUsernameValue();
            this.usernameValidationError = apiError.reason;
            this.username?.setErrors({ server: true });
            break;
          default:
            this._matSnackBar.open(
              'Sorry, something went wrong. Please refresh the page and try again.',
              'OK',
            );
        }
      },
    });
  }

  protected savePassword(): void {
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.invalid) {
      return;
    }

    const newPassword = this.newPassword?.value;
    const newPasswordConfirmation = this.newPasswordConfirmation?.value;
    const currentPassword = this.passwordForm.get('currentPassword')?.value;

    if (!newPassword || !newPasswordConfirmation || !currentPassword) {
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      this.newPasswordConfirmation?.setErrors({ confirmed: true });
      return;
    }

    this._userService
      .updatePassword(currentPassword, newPassword, newPasswordConfirmation)
      .subscribe({
        next: () => {
          this._matSnackBar.open('Success! Password has been updated.', 'OK');
          this._tryResetFormState(this._passwordFormEl);
        },
        error: (err: HttpErrorResponse) => {
          const apiError: ApiError = err.error;

          switch (err.status) {
            case 401:
              this.passwordForm
                .get('currentPassword')
                ?.setErrors({ server: true });
              break;
            case 422:
              this.passwordValidationError = apiError.reason;
              this.newPassword?.setErrors({ server: true });
              break;
            default:
              this._matSnackBar.open(
                'Sorry, something went wrong. Please refresh the page and try again.',
                'OK',
              );
          }
        },
      });
  }
}
