import bcrypt from 'bcrypt-nodejs';
import mongoose, { HookNextFunction, Document } from 'mongoose';
import timestamp from 'mongoose-timestamp';
import validator from 'validator';
import permalink from 'mongoose-permalink';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  postcode: string;
  subscribeToken: string;
  subscribeTokenCreated: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  updatedAt: string;
}

export interface IUserModel extends IUser, Document {
  comparePassword(candidatePassword: string): boolean;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  githubId: String,
  password: String,
  firstName: String,
  lastName: String,
  country: String,
  postcode: String,
  subscribeToken: String,
  subscribeTokenCreated: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

function encryptPassword(this: IUser, next: HookNextFunction) {
  try {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    return bcrypt.genSalt(5, (saltErr, salt) => {
      if (saltErr) return next(saltErr);
      return bcrypt.hash(
        user.password,
        salt,
        () => {
          return;
        },
        (hashErr: Error, hash: string) => {
          if (hashErr) return next(hashErr);
          user.password = hash;
          return next();
        }
      );
    });
  } catch (error) {
    return next(error);
  }
}

function validateEmail(this: IUser, next: HookNextFunction) {
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
UserSchema.pre('save', encryptPassword);
UserSchema.pre('save', validateEmail);

UserSchema.plugin(permalink, {
  sources: ['firstName', 'lastName']
});

UserSchema.plugin(timestamp);

/**
 * Password hash middleware.
 */
UserSchema.methods.comparePassword = function(
  candidatePassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(false);
      }
      if (!isMatch) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

export default mongoose.model<IUserModel>('User', UserSchema);
