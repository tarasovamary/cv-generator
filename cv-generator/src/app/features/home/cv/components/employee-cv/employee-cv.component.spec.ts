import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCvComponent } from './employee-cv.component';

describe('EmployeeCvComponent', () => {
  let component: EmployeeCvComponent;
  let fixture: ComponentFixture<EmployeeCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCvComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
