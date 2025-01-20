import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { ORIGIN, SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

const createToken = (user: IUser): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async login(userData: IUser): Promise<{ cookie: string; findUser: IUser; createdNow: boolean }> {
    const findUser = await UserModel.findOne({ email: userData.email }).select('+password');

    if (!findUser) {
      const newUser = new UserModel(userData);
      await newUser.save();

      const tokenData = createToken(newUser);
      const cookie = createCookie(tokenData);

      return { cookie, findUser: newUser.toJSON(), createdNow: true };
    }

    if (!(await findUser.correctPassword(userData.password, findUser.password))) {
      throw new HttpException(409, 'Incorrect credentials ❌');
    }

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser: findUser.toJSON(), createdNow: false };
  }

  public async logout(userData: IUser): Promise<IUser> {
    const findUser: IUser = await UserModel.findById(userData._id);
    if (!findUser) throw new HttpException(409, `User was not found.`);

    return findUser;
  }

  public async generatePasswordResetLink(email: string): Promise<{ restLink: string; user: IUser }> {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) throw new HttpException(409, `User with email ${email} was not found.`);

    const resetToken = findUser.createPasswordResetToken();
    await findUser.save({ validateBeforeSave: false });

    return { restLink: `${ORIGIN}/reset-password?token=${resetToken}`, user: findUser };
  }
}
