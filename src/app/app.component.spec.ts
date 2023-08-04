import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { User } from './app.types';
import { API_CONFIG, GOALLY_API_CONFIG } from './providers/api.config';
import { AuthService } from './services/auth.service';
import { CsrfService } from './services/csrf.service';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let csrfServiceSpy: jasmine.SpyObj<CsrfService>;
  let currentUserStub: BehaviorSubject<User | null>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    csrfServiceSpy = jasmine.createSpyObj('CsrfService', ['getToken']);
    csrfServiceSpy.getToken.and.returnValue(of(undefined));
    currentUserStub = new BehaviorSubject<User | null>(null);

    const userServiceStub = class {
      currentUser = currentUserStub;
    };

    TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: API_CONFIG, useValue: GOALLY_API_CONFIG },
        { provide: UserService, useClass: userServiceStub },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: CsrfService, useValue: csrfServiceSpy },
      ],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
