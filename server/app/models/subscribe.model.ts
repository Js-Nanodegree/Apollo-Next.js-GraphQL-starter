import mongoose, { HookNextFunction, Document} from 'mongoose';
import timestamp from 'mongoose-timestamp';
import validator from 'validator';


export interface ISubscribe extends Document {
email: string,
active: boolean,
token: string;
updatedAt: string
}

const SubscribeSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    active: {type: Boolean, default: true},
    token: {type: String, required: true}
});


function validateEmail(this: ISubscribe, next: HookNextFunction) {
    try {
        const user = this;
        if (validator.isEmail(user.email)) {
            return next();
        }
        return next(new Error('Invalid email address'));
    } catch (e) {
        return next(e);
    }
}

SubscribeSchema.pre('save', validateEmail);

SubscribeSchema.plugin(timestamp);

export default mongoose.model<ISubscribe>('Subscribe', SubscribeSchema);
