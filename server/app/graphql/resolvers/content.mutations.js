import Controller from '../../controllers/content.controller';

export default {
    CreateContent: (_, {input}, context) => {
        return Controller.createContent(_, {...input}, context);
    }
}
