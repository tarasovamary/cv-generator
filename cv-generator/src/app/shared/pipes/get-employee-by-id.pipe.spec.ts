import { GetEmployeeByIdPipe } from './get-employee-by-id.pipe';

describe('GetEmployeeByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new GetEmployeeByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
