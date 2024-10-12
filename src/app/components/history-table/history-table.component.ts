import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { HistoryActions } from 'store/history/actions/history.actions';

export interface NetBudgetRecord {
  id: string;
  budget: number;
  currency: string;
  region: 'centre' | 'outskirts';
  familySize: 'single' | 'family';
  city: string;
}

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: NetBudgetRecord[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['budget', 'currency', 'region', 'familySize', 'city'];
  dataSource!: MatTableDataSource<NetBudgetRecord>;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<NetBudgetRecord>(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);

    if (changes['data'] && this.dataSource) {
      this.dataSource.data = [...this.data];
      if (this.paginator) {
        this.paginator.length = this.data.length;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  clearHistory(): void {
    this._store.dispatch(HistoryActions.clearHistory());
  }
}
