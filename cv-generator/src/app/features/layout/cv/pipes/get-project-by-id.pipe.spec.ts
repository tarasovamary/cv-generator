import { GetProjectByIdPipe } from './get-project-by-id.pipe';

describe('GetProjectByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new GetProjectByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
