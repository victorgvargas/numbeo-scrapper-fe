import { Injectable } from '@angular/core';
import { NetBudgetRecord } from '../components/history-table/history-table.component';
import { Store } from '@ngrx/store';
import { HistoryActions } from 'store/history/actions/history.actions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private _store: Store) {}

  /**
   * Local storage session - to be removed as soon as api is ready
   */

  setItemInLocalStorage(budgetRecord: NetBudgetRecord) {
    localStorage.setItem(budgetRecord.id!, JSON.stringify(budgetRecord));
  }

  getItemFromLocalStorage(id: string) {
    return JSON.parse(localStorage.getItem(id) as string);
  }  

  getAllItemsFromLocalStorage(): Observable<NetBudgetRecord[]> {
    const records: NetBudgetRecord[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const record = JSON.parse(localStorage.getItem(key) as string) as NetBudgetRecord;
        records.push(record);
      }
    }
    return of(records);
  }

  /** ******************************************************************* */
}
