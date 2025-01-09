import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { CvListComponent } from './cv-list.component';

describe('CvListComponent', () => {
  let component: CvListComponent;
  let fixture: ComponentFixture<CvListComponent>;
  let mockStore: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;
  let mouseEventSpy: jasmine.SpyObj<MouseEvent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mouseEventSpy = jasmine.createSpyObj('MouseEvent', ['stopPropagation']);

    const activatedRouteMock = {
      parent: {
        snapshot: {},
        params: of({}),
      },
    };

    await TestBed.configureTestingModule({
      imports: [CvListComponent],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        MessageService,
        ConfirmationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create CvListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate correctly when onSelect is called', () => {
    const testId = '123';

    component.onSelect(testId);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['../', testId], { relativeTo: activatedRoute });
  });

  it('should call stopPropagation when onDelete is called', () => {
    component.onDelete('123', mouseEventSpy);

    expect(mouseEventSpy.stopPropagation).toHaveBeenCalled();
  });
});
