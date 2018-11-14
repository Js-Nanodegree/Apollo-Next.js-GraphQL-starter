import mongoose, {Schema} from 'mongoose';
import timestamp from 'mongoose-timestamp';
import validator from 'validator';

const SubscribeSchema = new Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    active: {type: Boolean, default: true},
    token: {type: String, required: true}
});


function validateEmail(next) {
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

export default mongoose.model('Subscribe', SubscribeSchema);
