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
import { ApiService } from 'src/app/services/api.service';
import { HistoryService } from 'src/app/services/history.service';
import { catchError, finalize, forkJoin, map, Observable, startWith, tap } from 'rxjs';
import { v4 } from 'uuid';
import { OnlyNumber } from 'src/app/directives/only-number.directive';
import { Store } from '@ngrx/store';
import { HistoryActions } from 'store/history/actions/history.actions';
import { selectHistory } from 'store/history/selectors/history.selectors';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import citiesData from '../../../assets/cities.json';
import { CostsDetailsComponent } from 'src/app/components/costs-details/costs-details.component';
import { CostsStructure } from 'src/app/models/costs-structure.model';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CostsDetailsComponent,
    FooterComponent,
    HistoryTableComponent,
    HeaderComponent,
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
  cities = citiesData.cities;
  data: NetBudgetRecord[] = [];
  filteredCities: Observable<string[]> | undefined;
  costsStructure: {datasets: ChartDataset<"pie", number[]>[], labels: string[]} | undefined;
  requests$: Observable<any> | undefined;

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _historyService: HistoryService,
    private _store: Store
  ) {}
  
  ngOnInit(): void {
    this.getTableData();
    this.filteredCities = this.form.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value as string))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) => city.toLowerCase().includes(filterValue));
  }

  private _mapResponseToChartStructure(costs: CostsStructure, budgetRecord: NetBudgetRecord): {datasets: ChartDataset<"pie", number[]>[], labels: string[]} {
    const { familySize, region } = budgetRecord;
    const finalCosts: { costs: number, rent: number } = {costs: 0, rent: 0};

    if (familySize === 'single') {
      finalCosts['costs'] = costs.single_person_cost;

      if (region === 'centre') {
        finalCosts['rent'] = costs.centre_rent;
      } else if (region === 'outskirts') {
        finalCosts['rent'] = costs.outskirts_rent;
      }
    } else if (familySize === 'family') {
      finalCosts['costs'] = costs.family_of_four_cost;

      if (region === 'centre') {
        finalCosts['rent'] = costs.three_bedroom_city_centre_rent;
      } else if (region === 'outskirts') {
        finalCosts['rent'] = costs.three_bedroom_outskirts_rent;
      }
    }

    const datasets: ChartDataset<"pie", number[]>[] = [
      {
        data: [finalCosts.costs, finalCosts.rent],
        backgroundColor: ['#39898f', '#6C757D'],
        hoverBackgroundColor: ['#39898f', '#6C757D'],
      },
    ];

    const labels: string[] = ['Costs', 'Rent'];

    return { datasets, labels };
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
    this._store.dispatch(HistoryActions.loadHistory());
    this._store.select(selectHistory).subscribe((data) => {
      if (data) {
        this.data = data;
      } else {
        console.error('History data is still undefined or not loaded.');
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.netIncome = null;

    const netBudgetRecord: NetBudgetRecord = {
      id: v4(),
      income: this.form.controls['income'].value as number,
      costs: 0,
      budget: 0,
      currency: this.form.controls['currency'].value as string,
      region: this.getCityRegion(),
      familySize: this.getFamilySize(),
      city: this.form.controls['city'].value as string,
    };

    /**
     * Remove this after testing
     */
    const costs$ = this._apiService.getCosts(netBudgetRecord).pipe(
      tap((costs) => console.log(costs)),
      tap(costs => this.costsStructure = { ...this._mapResponseToChartStructure(costs, netBudgetRecord) }),
    );

    const netIncome$ = this._apiService
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
          this._historyService.setItemInLocalStorage({
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
      );

    this.requests$ = forkJoin([costs$, netIncome$]);
  }
}
