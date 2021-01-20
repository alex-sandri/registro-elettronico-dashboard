import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGradeDialogComponent } from './create-grade-dialog.component';

describe('CreateGradeDialogComponent', () => {
  let component: CreateGradeDialogComponent;
  let fixture: ComponentFixture<CreateGradeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGradeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
