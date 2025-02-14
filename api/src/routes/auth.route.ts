import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, ForgotEmailDto, PasswordResetDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}login`, ValidationMiddleware(CreateUserDto), this.auth.logIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
    this.router.post(`${this.path}forgot-password`, ValidationMiddleware(ForgotEmailDto), this.auth.forgotPwd);
    this.router.put(`${this.path}reset-password/:token`, ValidationMiddleware(PasswordResetDto), this.auth.resetPwd);
    this.router.get(`${this.auth}/me`, AuthMiddleware, this.auth.getMe);
  }
}
