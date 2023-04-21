import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormsComponent } from './create-forms.component';

describe('CreateFormsComponent', () => {
  let component: CreateFormsComponent;
  let fixture: ComponentFixture<CreateFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
