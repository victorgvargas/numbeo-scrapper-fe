import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-costs-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './costs-map.component.html',
  styleUrl: './costs-map.component.scss'
})
export class CostsMapComponent {
  @Input() city = "";
}
