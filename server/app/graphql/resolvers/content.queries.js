import Controller from '../../controllers/content.controller';

export default {
    GetContent: (_, {input}, context) => {
        return Controller.getContent(_, {...input}, context);
    }
}
