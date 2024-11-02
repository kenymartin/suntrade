import * as dotenv from "dotenv";
dotenv.config();
const config = {
    //JWT VARIABLES
    jwSecrect: process.env.ACCESS_TOKEN_SECRECT,
    jwExpiredIn: "20m",
    refreshTokenSecret() {
        return process.env.REFRESH_TOKEN_SECRECT;
    },
    //SMTP VARIBALES
    smtpService: process.env.SMTP_SERVICE,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    //DEVELOPERS VARIABLES
    // noficationEmail: {
    //   Me: process.env.NOTIFICATION_EMAIL_ME ??'default@example.com',
    //   // All: process.env.NOFICATION_EMAIL_ALL?.split(';'),
    // },
    currentUser: {
        userId: '',
        username: ''
    }
};
export default config;
