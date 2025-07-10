import { TestBed } from '@angular/core/testing';

import { MealsplanService } from './mealsplan.service';

describe('MealsplanService', () => {
  let service: MealsplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealsplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
