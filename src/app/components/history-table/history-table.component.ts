import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { HistoryActions } from 'store/history/actions/history.actions';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

export interface NetBudgetRecord {
  id: string;
  income: number;
  costs: number;
  budget: number;
  currency: string;
  region: 'centre' | 'outskirts';
  familySize: 'single' | 'family';
  city: string;
}

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: NetBudgetRecord[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['income', 'costs', 'budget', 'currency', 'region', 'familySize', 'city', 'actions'];
  dataSource!: MatTableDataSource<NetBudgetRecord>;
  readonly dialog = inject(MatDialog);

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<NetBudgetRecord>(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  editElement(element: NetBudgetRecord): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._store.dispatch(HistoryActions.editHistory({ id: element.id, changes: result }));
      }
    });
  }

  deleteElement(element: NetBudgetRecord): void {
    this._store.dispatch(HistoryActions.deleteHistory({ id: element.id }));
  }

  clearHistory(): void {
    localStorage.clear();
    this._store.dispatch(HistoryActions.clearHistory());
  }
}
