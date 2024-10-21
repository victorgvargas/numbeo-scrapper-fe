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
import { ApiService } from 'src/app/services/api.service';
import { ExpenditureOptions } from 'src/app/models/expediture-options.model';
import { switchMap, tap } from 'rxjs';

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
    income: [this.data.income],
    budget: [this.data.budget],
    currency: [this.data.currency],
    region: [this.data.region],
    familySize: [this.data.familySize],
    city: [this.data.city]
  });
  currencies = CURRENCY_LIST;
  
  constructor(private _fb: FormBuilder, private _apiService: ApiService) {}

  save(): void {
    this._apiService.getNetIncome(
      this.data.city, 
      this.editForm.value.income as number, 
      { 
        numOfPersons: this.editForm.value.familySize === 'single' ? 'single' : 'family', 
        cityRegion: this.editForm.value.region === 'centre' ? 'centre' : 'outskirts', 
        currency: this.editForm.value.currency as string
       }).pipe(
        tap(res => this.editForm.patchValue({ budget: res.result })),
      ).subscribe(() => this.dialogRef.close(this.editForm.value));
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
