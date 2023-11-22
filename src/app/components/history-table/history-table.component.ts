import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

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
  imports: [CommonModule, MatTableModule],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTableComponent {
  @Input() data: NetBudgetRecord[] = [];
  displayedColumns = ['budget', 'currency', 'region', 'familySize', 'city'];
}
