import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvFormComponent } from './cv-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('CvFormComponent', () => {
  let component: CvFormComponent;
  let fixture: ComponentFixture<CvFormComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvFormComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CvFormComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create CvFormComponent', () => {
    expect(component).toBeTruthy();
  });
});
