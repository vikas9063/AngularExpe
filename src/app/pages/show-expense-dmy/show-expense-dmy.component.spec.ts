import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExpenseDmyComponent } from './show-expense-dmy.component';

describe('ShowExpenseDmyComponent', () => {
  let component: ShowExpenseDmyComponent;
  let fixture: ComponentFixture<ShowExpenseDmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowExpenseDmyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowExpenseDmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
