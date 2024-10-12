import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadHistoryEffects } from './history.effects';

describe('LoadHistoryEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadHistoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadHistoryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LoadHistoryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
