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

  editHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.editHistory),
      mergeMap(({ id, changes }) =>
        this.historyService.updateItemInLocalStorage(id, changes).pipe(
          map(() => HistoryActions.editHistorySuccess({ id, changes })),
          catchError(() => of(HistoryActions.editHistoryFailure({ id, error: "ApiFetchError" })))
        )
      )
    )
  );

  deleteHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.deleteHistory),
      mergeMap(({ id }) =>
        this.historyService.deleteItemFromLocalStorage(id).pipe(
          map(() => HistoryActions.deleteHistorySuccess({ id })),
          catchError(() => of(HistoryActions.deleteHistoryFailure({ id, error: "ApiFetchError" })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private historyService: HistoryService
  ) {}
}