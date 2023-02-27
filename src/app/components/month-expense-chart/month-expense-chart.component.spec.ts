import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthExpenseChartComponent } from './month-expense-chart.component';

describe('MonthExpenseChartComponent', () => {
  let component: MonthExpenseChartComponent;
  let fixture: ComponentFixture<MonthExpenseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthExpenseChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthExpenseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
