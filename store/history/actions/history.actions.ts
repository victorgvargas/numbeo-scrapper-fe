import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NetBudgetRecord } from 'src/app/components/history-table/history-table.component';

export type ApiFetchError = "ApiFetchError";

export const HistoryActions = createActionGroup({
  source: 'History',
  events: {
    'Load History': emptyProps(),
    'Load History Success': props<{ data: NetBudgetRecord[] }>(),
    'Load History Failure': props<{ error: ApiFetchError}>(),
    'Clear History': emptyProps(),
  }
}
);
