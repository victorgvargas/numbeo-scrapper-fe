import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { transformString } from './utils/transform-string';

const BASE_URL = 'http://127.0.0.1:8000'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getNetIncome(city: string, income: number, cityCentre: boolean): Observable<{ result: number }> {
    const transformedStr = transformString(city);
    const outskirts = !cityCentre;

    return this._http.get<{result: number}>(`${BASE_URL}/?city=${transformedStr}&income=${income}&city_centre=${cityCentre}&outskirts=${outskirts}`);
  }
}
