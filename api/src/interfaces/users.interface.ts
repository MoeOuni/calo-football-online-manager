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
  playersCountRight?: {
    goalkeeper: number;
    defender: number;
    midfielder: number;
    attacker: number;
  };
}
