import bcrypt from 'bcrypt-nodejs';
import mongoose, {Schema} from 'mongoose';
import timestamp from 'mongoose-timestamp';
import validator from 'validator';
import fieldRemover from 'mongoose-field-remover';
import permalink from 'mongoose-permalink';

const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    githubId: String,
    password: String,
    firstName: String,
    lastName: String,
    country: String,
    postcode: String,
    persona: {type: Schema.Types.ObjectId, ref: 'Persona'},
    subscribeToken: String,
    subscribeTokenCreated: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

function encryptPassword(next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        return bcrypt.genSalt(5, (saltErr, salt) => {
            if (saltErr) return next(saltErr);
            return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
                if (hashErr) return next(hashErr);
                user.password = hash;
                return next();
            });
        });
    } catch (error) {
        return next(error);
    }
}

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

/* ==================================================================
Remove fields from the schema before they are sent back to the user
================================================================== */
UserSchema.plugin(fieldRemover, 'password');
UserSchema.pre('save', encryptPassword);
UserSchema.pre('save', validateEmail);

UserSchema.plugin(permalink, {
    sources: ['firstName', 'lastName']
});

UserSchema.plugin(timestamp);

/**
 * Password hash middleware.
 */
UserSchema.methods = {
    comparePassword(candidatePassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                if (err) {
                    return reject(err);
                }
                if (!isMatch) {
                    return resolve(false);
                }
                return resolve(isMatch);
            });
        });
    }
};

export default mongoose.model('User', UserSchema);
