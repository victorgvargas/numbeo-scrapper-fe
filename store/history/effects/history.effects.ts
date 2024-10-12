import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HistoryService } from '../../../src/app/services/history.service';
import { HistoryActions } from '../actions/history.actions';

@Injectable()
export class HistoryEffects {
  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.loadHistory),
      mergeMap(() =>
        this.historyService.getAllItemsFromLocalStorage().pipe(
          map((data) => HistoryActions.loadHistorySuccess({ data })),
          catchError(() => of(HistoryActions.loadHistoryFailure({ error: "ApiFetchError" })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private historyService: HistoryService
  ) {}
}