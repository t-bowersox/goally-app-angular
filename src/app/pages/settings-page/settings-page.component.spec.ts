import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/app.types';
import { API_CONFIG, GOALLY_API_CONFIG } from 'src/app/providers/api.config';
import { GOALLY_USER_CONFIG, USER_CONFIG } from 'src/app/providers/user.config';
import { UserService } from 'src/app/services/user.service';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  let updateUsernameSpy: jasmine.Spy;
  let updatePasswordSpy: jasmine.Spy;
  let currentUserStub: BehaviorSubject<User | null>;

  beforeEach(() => {
    updateUsernameSpy = jasmine.createSpy('updateUsername');
    updatePasswordSpy = jasmine.createSpy('updatePassword');
    currentUserStub = new BehaviorSubject<User | null>(null);

    const userServiceStub = class {
      currentUser = currentUserStub;
      updateUsername = updateUsernameSpy;
      updatePassword = updatePasswordSpy;
    };

    TestBed.configureTestingModule({
      imports: [SettingsPageComponent, MatSnackBarModule, NoopAnimationsModule],
      providers: [
        { provide: API_CONFIG, useValue: GOALLY_API_CONFIG },
        { provide: USER_CONFIG, useValue: GOALLY_USER_CONFIG },
        { provide: UserService, useClass: userServiceStub },
      ],
    });
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
