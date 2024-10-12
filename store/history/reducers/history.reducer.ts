import { createReducer, on } from '@ngrx/store';
import { HistoryActions } from '../actions/history.actions';
import { NetBudgetRecord } from 'src/app/components/history-table/history-table.component';

export interface State {
  history: NetBudgetRecord[];
}

export const initialState: State = {
  history: [],
};

export const historyReducer = createReducer(
  initialState,
  on(HistoryActions.clearHistory, (state) => ({
    ...state,
    history: [],
  })),
  on(HistoryActions.loadHistorySuccess, (state, { data }) => ({
    ...state,
    history: data,
  })),
  on(HistoryActions.loadHistoryFailure, (state) => ({
    ...state,
    history: [],
  })),
);

