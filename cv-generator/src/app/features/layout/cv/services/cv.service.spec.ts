import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CvService } from './cv.service';

describe('CvService', () => {
  let service: CvService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
