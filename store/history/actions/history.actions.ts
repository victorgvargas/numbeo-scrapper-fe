import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NetBudgetRecord } from 'src/app/components/history-table/history-table.component';

export type ApiFetchError = "ApiFetchError";

export const HistoryActions = createActionGroup({
  source: 'History',
  events: {
    'Load History': emptyProps(),
    'Load History Success': props<{ data: NetBudgetRecord[] }>(),
    'Load History Failure': props<{ error: ApiFetchError}>(),
    'Edit History': props<{ id: string, changes: Partial<NetBudgetRecord> }>(),
    'Edit History Success': props<{ id: string, changes: Partial<NetBudgetRecord> }>(),
    'Edit History Failure': props<{ id: string, error: ApiFetchError }>(),
    'Delete History': props<{ id: string }>(),
    'Delete History Success': props<{ id: string }>(),
    'Delete History Failure': props<{ id: string, error: ApiFetchError }>(),
    'Clear History': emptyProps(),
  }
}
);
