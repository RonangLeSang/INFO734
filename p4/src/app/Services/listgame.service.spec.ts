import { TestBed } from '@angular/core/testing';

import { ListgameService } from './listgame.service';

describe('ListgameService', () => {
  let service: ListgameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListgameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
