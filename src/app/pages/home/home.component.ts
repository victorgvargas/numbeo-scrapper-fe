import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistoryTableComponent, NetBudgetRecord } from '../../components/history-table/history-table.component';
import { CURRENCY_LIST } from 'src/app/mocks/currencies';
import { ApiService } from 'src/app/api.service';
import { HistoryService } from 'src/app/services/history.service';
import { catchError, finalize, tap } from 'rxjs';
import { v4 } from 'uuid';
import { OnlyNumber } from 'src/app/directives/only-number.directive';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    HistoryTableComponent,
    ReactiveFormsModule,
    OnlyNumber
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  form = this._fb.group({
    city: ['', Validators.required],
    income: [0, [Validators.required, Validators.min(0)]],
    currency: ['EUR', Validators.required],
    familySize: ['single', Validators.required],
    cityRegion: ['', Validators.required],
  });
  netIncome: { result: number } | null = null;
  error = '';
  loading = false;
  currencies = CURRENCY_LIST;
  data: NetBudgetRecord[] = [];

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getFamilySize() {
    const rawValue = this.form.controls['familySize'].value;
    const familySizeValue: 'single' | 'family' =
      rawValue === 'single' || rawValue === 'family' ? rawValue : 'single';
    return familySizeValue;
  }

  getCityRegion() {
    const rawValue = this.form.controls['cityRegion'].value;
    const cityCentreValue: 'centre' | 'outskirts' =
      rawValue === 'centre' || rawValue === 'outskirts' ? rawValue : 'centre';
    return cityCentreValue;
  }

  getTableData() {
    const storage = { ...localStorage };

    this.data = [...Object.values(storage).map((str) => JSON.parse(str))];
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.netIncome = null;

    const netBudgetRecord: NetBudgetRecord = {
      id: v4(),
      budget: 0,
      currency: this.form.controls['currency'].value as string,
      region: this.getCityRegion(),
      familySize: this.getFamilySize(),
      city: this.form.controls['city'].value as string,
    };

    this._apiService
      .getNetIncome(
        netBudgetRecord.city!,
        this.form.controls['income'].value as number,
        {
          numOfPersons: netBudgetRecord.familySize!,
          cityRegion: netBudgetRecord.region!,
          currency: netBudgetRecord.currency!,
        }
      )
      .pipe(
        tap((income) => (this.netIncome = income)),
        tap(() =>
          this._historyService.setItem({
            ...netBudgetRecord,
            budget: this.netIncome?.result as number,
          })
        ),
        tap(() => this.getTableData()),
        finalize(() => (this.loading = false)),
        catchError(
          () =>
            (this.error =
              'There was an error retrieving your request. Please check the information supplied')
        )
      )
      .subscribe();
  }
}
