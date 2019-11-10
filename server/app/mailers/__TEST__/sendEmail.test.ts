import sendEmail from '../helpers/sendEmail';

const PREVIEW_URL = 'https://example.com';
const MESSAGE_ID = 123456789;

const sendMailMock = jest.fn(() => {
  return {
    messageId: MESSAGE_ID
  };
});

jest.mock('nodemailer');

const nodemailer = require('nodemailer'); //doesn't work with import
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock
});

nodemailer.createTestAccount.mockReturnValue({
  user: 'test@example.com',
  password: 'password'
});

nodemailer.getTestMessageUrl.mockReturnValue(PREVIEW_URL);

describe('Send email helper', () => {
  beforeEach(() => {
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
  });

  it('should send the email', async () => {
    const result = await sendEmail({
      to: 'test@example.com',
      from: 'test@example.com',
      subject: 'test email',
      html: '<h1>Test</h1>'
    });

    expect(result.messageId).toBe(MESSAGE_ID);

    expect(result.previewURL).toBe(PREVIEW_URL);
  });
});
