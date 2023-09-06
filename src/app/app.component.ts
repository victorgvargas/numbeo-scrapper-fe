import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = this._fb.group({
    city: ['', Validators.required],
    income: [0, [Validators.required, Validators.min(0)]],
    cityRegion: ['', Validators.required]
  });
  netIncome: { result: number } | null = null;
  error = '';
  loading = false;

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {}

  onSubmit() {
    const mapRegion = this.form.controls["cityRegion"].value === "centre" ? true : false;

    this.loading = true;
    this.error = '';
    this.netIncome = null;

    this._apiService.getNetIncome(this.form.controls["city"].value as string,
     this.form.controls["income"].value as number,
     mapRegion).pipe(
      tap(income => this.netIncome = income),
      finalize(() => this.loading = false),
      catchError(_ => this.error = "There was an error retrieving your request. Please check the information supplied")
     ).subscribe();
  }
}
