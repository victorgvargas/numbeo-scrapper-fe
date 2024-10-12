import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTableComponent } from './history-table.component';

describe('HistoryTableComponent', () => {
  let component: HistoryTableComponent;
  let fixture: ComponentFixture<HistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear table search history when clear button is pressed', () => {
    component.data = [
      { id: '1', budget: 100, currency: 'USD', region: 'centre', familySize: 'single', city: 'New York' },
      { id: '2', budget: 200, currency: 'USD', region: 'centre', familySize: 'family', city: 'Los Angeles' },
      { id: '3', budget: 300, currency: 'USD', region: 'outskirts', familySize: 'single', city: 'Chicago' },
    ];
    component.clearHistory();
    expect(component.data).toEqual([]);
  });
});
