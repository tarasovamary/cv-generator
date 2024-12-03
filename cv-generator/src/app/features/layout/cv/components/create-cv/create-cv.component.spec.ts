import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCvComponent } from './create-cv.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

describe('CreateCvComponent', () => {
  let component: CreateCvComponent;
  let fixture: ComponentFixture<CreateCvComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCvComponent],
      providers: [provideMockStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCvComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create CreateCvComponent', () => {
    expect(component).toBeTruthy();
  });
});
