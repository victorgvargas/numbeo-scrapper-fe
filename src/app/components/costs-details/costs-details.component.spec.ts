import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsDetailsComponent } from './costs-details.component';

describe('CostsDetailsComponent', () => {
  let component: CostsDetailsComponent;
  let fixture: ComponentFixture<CostsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
