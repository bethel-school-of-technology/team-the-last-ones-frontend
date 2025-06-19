import { TestBed } from '@angular/core/testing';

import { MealdbserviceService } from './mealdbservice.service';

describe('MealdbserviceService', () => {
  let service: MealdbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealdbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
