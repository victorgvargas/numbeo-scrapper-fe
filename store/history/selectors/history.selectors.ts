import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NetBudgetRecord } from 'src/app/components/history-table/history-table.component';

export const historyKey = 'history';

export interface HistoryState {
    history: NetBudgetRecord[];
}

export const selectHistoryState = createFeatureSelector<HistoryState>(historyKey);

export const selectHistory = createSelector(selectHistoryState, (state) => state.history);