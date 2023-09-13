import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { catchError, finalize, tap } from 'rxjs';
import { CURRENCY_LIST } from './mocks/currencies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = this._fb.group({
    city: ['', Validators.required],
    income: [0, [Validators.required, Validators.min(0)]],
    currency: ['EUR', Validators.required],
    familySize: ['single', Validators.required],
    cityRegion: ['', Validators.required]
  });
  netIncome: { result: number } | null = null;
  error = '';
  loading = false;
  currencies = CURRENCY_LIST;

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {}

  getFamilySize() {
    const rawValue = this.form.controls['familySize'].value;
    const familySizeValue: 'single' | 'family' = rawValue === 'single' || rawValue === 'family' ? rawValue : 'single';
    return familySizeValue;
  }

  getCityRegion() {
    const rawValue = this.form.controls['cityRegion'].value;
    const cityCentreValue: 'centre' | 'outskirts' = rawValue === 'centre' || rawValue === 'outskirts' ? rawValue : 'centre';
    return cityCentreValue;
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.netIncome = null;

    this._apiService.getNetIncome(this.form.controls["city"].value as string,
     this.form.controls["income"].value as number,
     { numOfPersons: this.getFamilySize(), cityRegion: this.getCityRegion(), currency: this.form.controls["currency"].value! }).pipe(
      tap(income => this.netIncome = income),
      finalize(() => this.loading = false),
      catchError(_ => this.error = "There was an error retrieving your request. Please check the information supplied")
     ).subscribe();
  }
}
