export interface IUser {
  _id?: string;
  email: string;
  password: string;
  balance?: number;
  passwordConfirm?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
}
