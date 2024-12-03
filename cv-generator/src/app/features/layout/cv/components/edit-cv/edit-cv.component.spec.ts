import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCvComponent } from './edit-cv.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('EditCvComponent', () => {
  let component: EditCvComponent;
  let fixture: ComponentFixture<EditCvComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    const activatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '123' }), // Mock route paramMap
      },
    };

    await TestBed.configureTestingModule({
      imports: [EditCvComponent],
      providers: [provideMockStore(), { provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCvComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create EditCvComponent', () => {
    expect(component).toBeTruthy();
  });
});
