import _app from '../_app';

describe('_app', () => {
  it('should match the snapshot', () => {
    expect(_app).toMatchSnapshot();
  });
});
