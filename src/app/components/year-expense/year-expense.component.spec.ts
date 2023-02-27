import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearExpenseComponent } from './year-expense.component';

describe('YearExpenseComponent', () => {
  let component: YearExpenseComponent;
  let fixture: ComponentFixture<YearExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
