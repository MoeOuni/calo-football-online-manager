import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { MONGO_URI } = process.env;
export const { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } = process.env;
