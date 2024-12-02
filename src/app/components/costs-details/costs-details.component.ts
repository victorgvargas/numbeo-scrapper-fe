import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-costs-details',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './costs-details.component.html',
  styleUrl: './costs-details.component.scss'
})
export class CostsDetailsComponent {
  @Input() datasets: ChartDataset<"pie", number[]>[] = [];
  @Input() labels: string[] = [];
  
  pieChartOptions = {
    responsive: false,
  };
}
