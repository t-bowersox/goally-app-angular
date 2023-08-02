import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { API_CONFIG, GOALLY_API_CONFIG } from 'src/app/providers/api.config';
import { GOALLY_USER_CONFIG, USER_CONFIG } from 'src/app/providers/user.config';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RegisterPageComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: API_CONFIG, useValue: GOALLY_API_CONFIG },
        { provide: USER_CONFIG, useValue: GOALLY_USER_CONFIG },
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