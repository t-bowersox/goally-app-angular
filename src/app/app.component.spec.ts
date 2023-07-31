import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { API_CONFIG, GOALLY_API_CONFIG } from './providers/api.config';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: API_CONFIG, useValue: GOALLY_API_CONFIG }],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
