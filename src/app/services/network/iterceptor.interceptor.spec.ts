import { TestBed } from '@angular/core/testing';

import { IterceptorInterceptor } from './iterceptor.interceptor';

describe('IterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: IterceptorInterceptor = TestBed.inject(IterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
