import { Injectable } from '@angular/core';
import { NetBudgetRecord } from '../components/history-table/history-table.component';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor() {}

  setItem(budgetRecord: NetBudgetRecord) {
    localStorage.setItem(budgetRecord.id!, JSON.stringify(budgetRecord));
  }

  getItem(id: string) {
    return JSON.parse(localStorage.getItem(id) as string);
  }
}
