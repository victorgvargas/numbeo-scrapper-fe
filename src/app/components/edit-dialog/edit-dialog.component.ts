import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NetBudgetRecord } from '../history-table/history-table.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CURRENCY_LIST } from 'src/app/mocks/currencies';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditDialogComponent>);
  readonly data = inject<NetBudgetRecord>(MAT_DIALOG_DATA);
  readonly editForm = this._fb.group({
    budget: [this.data.budget],
    currency: [this.data.currency],
    region: [this.data.region],
    familySize: [this.data.familySize],
    city: [this.data.city]
  });
  currencies = CURRENCY_LIST;
  
  constructor(private _fb: FormBuilder) {}

  save(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
