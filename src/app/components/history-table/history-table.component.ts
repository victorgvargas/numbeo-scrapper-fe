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
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
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

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<NetBudgetRecord>(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.paginator) {
      this.dataSource.data = [...this.data];
      this.paginator.length = this.data.length;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
