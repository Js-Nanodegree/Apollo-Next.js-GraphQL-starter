import mongoose, { HookNextFunction, Document} from 'mongoose';
import timestamp from 'mongoose-timestamp';
import validator from 'validator';
import {IUser} from './user.model';


export interface IInvite extends Document {
email: string,
active: boolean,
token: string;
updatedAt: string;
message: string;
inviter: IUser['_id'] | null
}

const InviteSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    active: {type: Boolean, default: true},
    token: {type: String, required: true},
    message: String,
    inviter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


function validateEmail(this: IInvite, next: HookNextFunction) {
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

InviteSchema.pre('save', validateEmail);

InviteSchema.plugin(timestamp);

export default mongoose.model<IInvite>('Invite', InviteSchema);
