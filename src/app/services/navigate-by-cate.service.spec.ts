import { TestBed } from '@angular/core/testing';

import { NavigateByCateService } from './navigate-by-cate.service';

describe('NavigateByCateService', () => {
  let service: NavigateByCateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateByCateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
