import { TestBed } from '@angular/core/testing';

import { API_CONFIG, GOALLY_API_CONFIG } from '../providers/api.config';
import { ApiService } from './api.service';
import { GoalsService } from './goals.service';

describe('GoalsService', () => {
  let service: GoalsService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: API_CONFIG, useValue: GOALLY_API_CONFIG },
      ],
    });
    service = TestBed.inject(GoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
