import { model, Schema, Document } from 'mongoose';
import { IUser } from '@interfaces/users.interface';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
    },
    image: {
      type: String,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

export interface IUserWithMethods extends IUser {
  correctPassword: (candidatePassword: string, userPassword: string) => boolean;
  createPasswordResetToken: () => string;
}

export const UserModel = model<IUserWithMethods & Document>('User', UserSchema);
