import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { MailService } from '@/services/mail.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      const { cookie, findUser, createdNow } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);

      if (createdNow) {
        const mailer = new MailService(findUser, 'http://localhost:3000');

        await mailer.sendWelcome();
      }

      res.status(200).json({
        data: {
          ...findUser,
          password: null,
        },
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.user;
      const logOutUserData: IUser = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ status: 'success', message: 'Goodbye for now! We’ll be here when you come back.', logOutUserData });
    } catch (error) {
      next(error);
    }
  };
}
