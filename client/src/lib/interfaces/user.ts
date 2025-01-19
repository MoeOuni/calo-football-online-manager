export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IForgotPwd {
  email: string;
}

export interface IResetPwd {
  password: string;
  confirmPassword: string;
}
