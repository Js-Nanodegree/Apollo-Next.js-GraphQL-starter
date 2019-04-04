import generateToken from '../generateToken';

describe('Generate authentication token', () => {
  it('should', () => {
    expect.assertions(1);

    const token = generateToken({ _id: '' });

    expect(typeof token).toBe('string');
  });
});
