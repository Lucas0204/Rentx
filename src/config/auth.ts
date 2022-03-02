import 'dotenv/config';

export default {
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES,
    },
    refresh_token: {
        secret: process.env.REFRESH_SECRET,
        expires: process.env.REFRESH_EXPIRES,
        expires_days: process.env.REFRESH_EXPIRES_DAYS
    }
}
