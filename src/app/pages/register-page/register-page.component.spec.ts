import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { API_CONFIG, GOALLY_API_CONFIG } from 'src/app/providers/api.config';
import { GOALLY_USER_CONFIG, USER_CONFIG } from 'src/app/providers/user.config';
import { UserService } from 'src/app/services/user.service';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['create']);

    TestBed.configureTestingModule({
      imports: [RegisterPageComponent, NoopAnimationsModule],
      providers: [
        { provide: API_CONFIG, useValue: GOALLY_API_CONFIG },
        { provide: USER_CONFIG, useValue: GOALLY_USER_CONFIG },
        { provide: UserService, useValue: userServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
