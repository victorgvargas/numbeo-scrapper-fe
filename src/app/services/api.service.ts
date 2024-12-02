import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { transformString } from '../utils/transform-string';
import { ExpenditureOptions } from '../models/expediture-options.model';
import { mapExpenditureOptions } from '../utils/map-expenditure-options';
import { CostsStructure } from '../models/costs-structure.model';
import { NetBudgetRecord } from '../components/history-table/history-table.component';

// const BASE_URL = 'https://numbeo-scrapper.onrender.com';
const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  getNetIncome(
    city: string,
    income: number,
    options: ExpenditureOptions
  ): Observable<{ result: number }> {
    const transformedStr = transformString(city);
    const {
      cityCentre,
      outskirts,
      threeBedroomCityCentre,
      threeBedroomOutskirts,
      currency,
    } = mapExpenditureOptions(options);

    return this._http.get<{ result: number }>(
      `${BASE_URL}/?city=${transformedStr}&income=${income}&city_centre=${cityCentre}&outskirts=${outskirts}&three_bedroom_city_centre=${threeBedroomCityCentre}&three_bedroom_outskirts_rent=${threeBedroomOutskirts}&currency=${currency}`
    );
  }

  getCosts(budgetRecord: NetBudgetRecord): Observable<CostsStructure> {
    const transformedStr = transformString(budgetRecord.city);

    return this._http.get<CostsStructure>(
      `${BASE_URL}/costs?city=${transformedStr}?currency=${budgetRecord.currency}`
    );
  }
}
