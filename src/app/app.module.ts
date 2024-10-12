import { isDevMode, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { historyReducer } from 'store/history/reducers/history.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HistoryEffects } from '../../store/history/effects/history.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { historyKey } from 'store/history/selectors/history.selectors';

@NgModule({
  declarations: [AppComponent],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(historyKey, historyReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: !isDevMode(),
      autoPause: true, 
      trace: false, 
      traceLimit: 75,
      connectInZone: true
    }),
    EffectsModule.forFeature([HistoryEffects]),
    EffectsModule.forRoot([]),
  ],
})
export class AppModule {}
