import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavheaderComponent } from './navheader.component';

describe('NavheaderComponent', () => {
  let component: NavheaderComponent;
  let fixture: ComponentFixture<NavheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
