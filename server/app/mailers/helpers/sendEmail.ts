import mailgun from '../../config/mailgun';

interface IInput {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface IResult {
  id: string;
  message: string;
}

const sendEmail = (data: IInput): Promise<Error | IResult> => {
  return new Promise((resolve, reject) => {
    return mailgun.messages().send(data, (error: Error, body: IResult) => {
      if (error) {
        return reject(error);
      }

      return resolve(body);
    });
  });
};

export default sendEmail;
