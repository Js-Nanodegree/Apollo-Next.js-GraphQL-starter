import mongoose from 'mongoose';
import nJwt from 'njwt';
import { SIGNING_KEY } from '../../config/secrets';
import generateToken from '../../utils/generateToken';

describe('Generate token', () => {
  it('should generate and verify the token', async () => {
    const user = {
      _id: mongoose.Types.ObjectId(),
      firstName: 'Test',
      email: 'test@example.com'
    };

    const token = generateToken({ _id: user._id });

    const verifiedJwt = nJwt.verify(token, SIGNING_KEY);

    expect(String(verifiedJwt.body.sub)).toBe(String(user._id));
  });
});
