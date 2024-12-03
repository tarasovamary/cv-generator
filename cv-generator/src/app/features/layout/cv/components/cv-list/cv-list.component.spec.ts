import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvListComponent } from './cv-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('CvListComponent', () => {
  let component: CvListComponent;
  let fixture: ComponentFixture<CvListComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    const activatedRoute = {
      parent: {
        snapshot: {
          paramMap: convertToParamMap({ id: '123' }),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [CvListComponent],
      providers: [
        provideMockStore(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: activatedRoute },
        ConfirmationService,
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create CvListComponent', () => {
    expect(component).toBeTruthy();
  });
});
