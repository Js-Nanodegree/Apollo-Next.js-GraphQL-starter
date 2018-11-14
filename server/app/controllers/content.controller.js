// @flow
import moment from 'moment';
import axios from 'axios';
import * as URL from 'url';
import uuidv5 from 'uuid';
import Content from '../models/content';

import {InvalidURLError, InvalidURLStatusError} from './errors/content.errors';

async function createContent(_, {url}, context) {

    const isValid = !!URL.parse(url).host;

    if (!isValid) {
        throw new InvalidURLError({
            data: {
                url
            }
        });
    }

    const content = await Content.findOne({url})
        .lean()
        .then((data) => {
            return data;
        }).catch((error) => {
            console.error(error);
            throw error;
        });

    if (content) {
        return content;
    }

    const domain = URL.parse(url).host;
    const ucid = uuidv5(domain, url);


    const statusCheck = await axios.get(url)
        .then((response) => {
            return {status: response.status, check: moment().format()};
        }).catch((error) => {
            return {status: error.response.status, check: moment().format()};
        });

    if (statusCheck.status !== 200) {
        return new InvalidURLStatusError({
            data: {
                status: statusCheck.status,
                url
            }
        })
    }

    return Content.create({
        domain,
        url,
        ucid,
        statusCheck
    })
        .then((data) => {
            return data;
        }).catch((error) => {
            console.error(error);
            throw error;
        })
}



async function getContent(_, {UCIDs}, context) {

    return UCIDs.map(async (item) => {

        const content = await Content.findOne({ucid: item.split(':')[1]}).then((data) => {
            return data;
        }).catch((error) => {
            throw error;
        });

        return content;

    })

}


export default {
    createContent,
    getContent
}