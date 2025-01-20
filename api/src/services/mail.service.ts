import { Service } from 'typedi';
import { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } from '@config';
import ejs from 'ejs';
import path from 'path';
import nodemailer from 'nodemailer';

import { IUser } from '@interfaces/users.interface';

@Service()
export class MailService {
  to: string;
  from: string;
  url: string;
  payload?: any;

  constructor(user: IUser, url: string, payload?: any) {
    this.to = user.email;
    this.url = url;
    this.from = `Calo Football manager <${MAIL_USER}>`;
    this.payload = payload;
  }

  newTransport() {
    // SendGrid Configuration on Production Environment
    // if (process.env.NODE_ENV === "production") {
    //   return nodemailer.createTransport({
    //     service: "SendGrid",
    //     auth: {
    //       user: config.email.email,
    //       pass: config.email.pass,
    //     },
    //   });
    // }

    return nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }

  // Send the actual email
  async send(template: string, subject: string) {
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

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Calo Football Manager!');
  }
}
