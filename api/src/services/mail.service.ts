import { Service } from 'typedi';
import { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } from '@config';
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';

import { IUser } from '@interfaces/users.interface';

export class MailService {
  to: string;
  from: string;
  payload?: any;

  public constructor(user: IUser, payload?: any) {
    this.to = user.email;
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
  public async send(template: string, subject: string, contentSubject?: string) {
    try {
      // Render HTML based on the EJS template
      const templateFile = path.resolve(__dirname, `../templates/emails/${template}.ejs`);
      const html = await ejs.renderFile(templateFile, {
        subject: contentSubject || subject,
        pageTitle: contentSubject || subject,
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
    await this.send('welcome', 'Welcome to Calo Football Online Manager – Your Journey Starts Now!', 'Welcome to the World of Football Management');
  }

  public async sendRestPwd() {
    await this.send('reset-password', 'Your password reset token (valid for only 1 hour)');
  }

  public async sendPwdChanged() {
    await this.send('password-changed', 'Your password has been changed');
  }

  public async sendPlayerListedToSale() {
    await this.send('list-player-to-sale', 'Player Listed for Sale');
  }

  public async sendPlayerRemovedFromSale() {
    await this.send('remove-player-from-sale', 'Player Removed from Sale');
  }

  public async sendPurchasePlayerBuyer() {
    await this.send('purchase-player-buyer', 'Player Purchase Successful');
  }

  public async sendPurchasePlayerSeller() {
    await this.send('purchase-player-seller', 'Player Sold Successfully');
  }
}
