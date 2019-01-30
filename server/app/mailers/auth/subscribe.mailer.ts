import path from 'path';
import ejs from 'ejs-promise';
import {MAILGUN_CONFIG} from '../../config/secrets';
import {IS_DEBUG} from '../../config/env';
import {SYSTEM_EMAIL_ADDRESS, DEBUG_EMAIL_ADDRESS, DEV_URL, PROD_URL} from '../../config/settings';

const mailgun = require('mailgun-js')(MAILGUN_CONFIG);

export default async ({email, id, token}: any) => {
    const template = path.join(__dirname, '../templates/subscribe.template.ejs');

    const URL = IS_DEBUG ? DEV_URL : PROD_URL;

    const html = await ejs.renderFile(template, {
        id,
        token,
        URL
    }, {}, function (err: Error, resultPromise: any) {
        if (err) {
            return err;
        }
        return resultPromise
            .then(function (result: string) {
                return result;
            }).catch((error: Error) => {
                throw error;
            });
    });


    if (!html) {
        return Error('Email HTML could not be rendered');
    }

    const message = {
        from: SYSTEM_EMAIL_ADDRESS,
        to: IS_DEBUG ? DEBUG_EMAIL_ADDRESS : email,
        subject: 'Please confirm your email address',
        html
    };

    return mailgun.messages().send(message, (error: Error) => {
        if (error) {
            throw error;
        }
    });
}