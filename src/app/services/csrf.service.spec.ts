import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { API_CONFIG, GOALLY_API_CONFIG } from '../providers/api.config';
import { CsrfService } from './csrf.service';

describe('CsrfService', () => {
  let service: CsrfService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClientTesting(),
        { provide: API_CONFIG, useValue: GOALLY_API_CONFIG },
      ],
    });
    service = TestBed.inject(CsrfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
