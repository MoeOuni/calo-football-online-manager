import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { MailService } from '@/services/mail.service';
import { ORIGIN } from '@/config';

export class AuthController {
  public auth = Container.get(AuthService);

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      const { cookie, findUser, createdNow } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);

      if (createdNow) {
        const mailer = new MailService(findUser);

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

  public getMe = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.status(200).json(req.user);
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

  public forgotPwd = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const { resetLink, user } = await this.auth.generatePasswordResetLink(email);

      const mailer = new MailService(user, {
        resetLink,
      });
      await mailer.sendRestPwd();

      res.status(200).json({
        status: 'success',
        message: "We've sent you an email with a link to reset your password.",
      });
    } catch (error) {
      next(error);
    }
  };

  public resetPwd = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;
      const { password, passwordConfirm } = req.body;

      const resetUser = await this.auth.resetPassword(token, password, passwordConfirm);

      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');
      const mailer = new MailService(resetUser, {
        ipAddress,
        userAgent,
      });

      await mailer.sendPwdChanged();

      res.status(201).json({
        resetUser: {
          ...resetUser,
          password: null,
        },
        status: 'success',
        message: 'Your password has been reset successfully, login with your new password.',
      });
    } catch (error) {
      next(error);
    }
  };
}
