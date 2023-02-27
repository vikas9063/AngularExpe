import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueAddCatComponent } from './dialogue-add-cat.component';

describe('DialogueAddCatComponent', () => {
  let component: DialogueAddCatComponent;
  let fixture: ComponentFixture<DialogueAddCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueAddCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueAddCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
