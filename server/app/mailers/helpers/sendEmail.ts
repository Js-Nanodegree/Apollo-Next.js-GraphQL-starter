import nodemailer from 'nodemailer';
import { IS_DEBUG } from '../../config/env';
interface IInput {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface IResult {
  id: string;
  message: string;
}

const sendEmail = async (data: IInput): Promise<Error | any> => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: data.from, // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.html // html body
    });

    const PREVIEW_URL = nodemailer.getTestMessageUrl(info);

    /*
     * Only log the info in development
     * You can add IS_TEST if you want to get the URl during testing - make sure you don't mock it
     */
    if (IS_DEBUG) {
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', PREVIEW_URL);
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    return { ...info, previewURL: PREVIEW_URL };
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
