import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsMapComponent } from './costs-map.component';

describe('CostsMapComponent', () => {
  let component: CostsMapComponent;
  let fixture: ComponentFixture<CostsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostsMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
