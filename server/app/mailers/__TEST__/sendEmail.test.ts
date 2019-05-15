import sendEmail from '../helpers/sendEmail';

describe('Send email helper', () => {
  it('should send the email', async () => {
    const result = await sendEmail({
      to: 'test@example.com',
      from: 'test@example.com',
      subject: 'test email',
      html: '<h1>Test</h1>'
    });

    expect(result.message).toBe('Queued. Thank you.');
  });
});
