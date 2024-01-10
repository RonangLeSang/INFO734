import { TestBed } from '@angular/core/testing';

import { ListGameService } from './list-game.service';

describe('ListGameService', () => {
  let service: ListGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
