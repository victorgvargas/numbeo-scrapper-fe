import { Injectable } from '@angular/core';
import { NetBudgetRecord } from '../components/history-table/history-table.component';
import { Store } from '@ngrx/store';
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
        try {
          const record = JSON.parse(localStorage.getItem(key) as string) as NetBudgetRecord;
          records.push(record);
        } catch (error) {
          console.warn(`Invalid JSON for key "${key}":`, error);
          // Optionally remove invalid entry:
          localStorage.removeItem(key);
        }
      }
    }
    return of(records);
  }
  
  updateItemInLocalStorage(id: string, changes: Partial<NetBudgetRecord>) {
    const record = this.getItemFromLocalStorage(id);
    const updatedRecord = { ...record, ...changes };
    localStorage.setItem(id, JSON.stringify(updatedRecord));
    return of(updatedRecord);
  }

  deleteItemFromLocalStorage(id: string) {
    localStorage.removeItem(id);
    return of(id);
  }

  /** ******************************************************************* */
}
