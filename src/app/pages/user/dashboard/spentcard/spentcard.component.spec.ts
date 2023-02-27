import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentcardComponent } from './spentcard.component';

describe('SpentcardComponent', () => {
  let component: SpentcardComponent;
  let fixture: ComponentFixture<SpentcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpentcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpentcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
