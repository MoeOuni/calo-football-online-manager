import { Service } from 'typedi';
import { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } from '@config';
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';

import { IUser } from '@interfaces/users.interface';

export class MailService {
  to: string;
  from: string;
  url: string;
  payload?: any;

  public constructor(user: IUser, url: string, payload?: any) {
    this.to = user.email;
    this.url = url;
    this.from = `Calo Football manager <${MAIL_USER}>`;
    this.payload = payload;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }

  // Send the actual email
  public async send(template: string, subject: string) {
    try {
      // Render HTML based on the EJS template
      const templateFile = path.resolve(__dirname, `../templates/emails/${template}.ejs`);
      const html = await ejs.renderFile(templateFile, {
        subject,
        cssFileUrl: this.url,
        pageTitle: subject,
        payload: this.payload,
      });

      // Define mail options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: subject,
        html: html.toString(),
      };

      // Send the email
      await this.newTransport().sendMail(mailOptions);
      console.log('Email sent');
    } catch (error) {
      console.log('Error sending email:', error);
      // Additional error handling if necessary like saving failed payload to database
    }
  }

  public async sendWelcome() {
    await this.send('welcome', 'Welcome to the Calo Football Manager!');
  }

  public async sendRestPwd() {
    await this.send('resetPassword', 'Your password reset token (valid for only 1 hour)');
  }

  public async sendPwdChanged() {
    await this.send('passwordChanged', 'Your password has been changed');
  }
}
