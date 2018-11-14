import ArticleField from '../../models/content/article-field.model';
import Persona from "../../models/persona.model";

export default () => {
    return new Promise(async () => {
        const defaultPersona = await Persona.findOne({label: 'Default'})
            .lean()
            .exec();

        return ArticleField.create({personas: [defaultPersona._id], weight: 0, text: ''})
            .then((data) => {
                return resolve(data);
            }).catch((error) => {
                return reject(error);
            });
    });
}