import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayExpenseComponent } from './today-expense.component';

describe('TodayExpenseComponent', () => {
  let component: TodayExpenseComponent;
  let fixture: ComponentFixture<TodayExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
