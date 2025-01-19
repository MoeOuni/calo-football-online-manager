import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { IUserWithMethods, UserModel } from '@models/users.model';

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
  public async login(userData: IUser): Promise<{ cookie: string; findUser: IUser }> {
    const findUser = await UserModel.findOne({ email: userData.email }).select('+password');

    if (!findUser) {
      const newUser = new UserModel(userData);
      await newUser.save();

      const tokenData = createToken(newUser);
      const cookie = createCookie(tokenData);

      return { cookie, findUser: newUser.toJSON() };
    }

    if (!(await findUser.correctPassword(userData.password, findUser.password))) {
      throw new HttpException(409, 'Incorrect credentials ❌');
    }

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser: findUser.toJSON() };
  }

  public async logout(userData: IUser): Promise<IUser> {
    const findUser: IUser = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
