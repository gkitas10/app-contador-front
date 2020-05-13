import { TestBed } from '@angular/core/testing';

import { Income.StatementService } from './income.statement.service';

describe('Income.StatementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Income.StatementService = TestBed.get(Income.StatementService);
    expect(service).toBeTruthy();
  });
});
