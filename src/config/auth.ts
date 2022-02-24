import 'dotenv/config';

export default {
    token_secret: process.env.JWT_SECRET,
    token_expires: process.env.JWT_EXPIRES,
    refresh_token_secret: process.env.REFRESH_SECRET,
    refresh_token_expires: process.env.REFRESH_EXPIRES,
    refresh_token_expires_days: process.env.REFRESH_EXPIRES_DAYS
}
