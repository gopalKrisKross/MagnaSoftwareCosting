import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualUsageComponent } from './actual-usage.component';

describe('ActualUsageComponent', () => {
  let component: ActualUsageComponent;
  let fixture: ComponentFixture<ActualUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
