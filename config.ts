import * as dotenv from "dotenv";
dotenv.config();

interface Config {
  //JWT VARIABLES
  jwSecrect: string|any;
  jwExpiredIn?: string;
  refreshTokenExpiredIn?: string;
  refreshTokenSecret(): string|undefined;
  ///SMTP VARIBALES
  smtpService?: string;
  smtpUser?: string;
  smtpPassword?: string;
  //DEVELOPERS VARIABLES
  // noficationEmail?: {
  //   Me: string|any,
  //   All?: string|string[]
  // };
  currentUser:{
    username: string
    userId: string
  }

  //FRONTEND VARIABLES
  frontendUrl: string

  //BACKEND VARIABLES
  
}
const config: Config = {
  //JWT VARIABLES
  jwSecrect: process.env.ACCESS_TOKEN_SECRECT,
  jwExpiredIn:process.env.ACCESS_TOKEN_SECRECT_EXPIRES_IN,
  refreshTokenExpiredIn:process.env.REFRESH_TOKEN_SECRECT_EXPIRES_IN,
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
  currentUser:{
    userId:'',
    username:''
  },
  //FRONTEND VARIABLES
  // frontendUrl: process.env.FRONTEND_URL??'http://localhost:5173'
  frontendUrl: process.env.FRONTEND_URL??'http://localhost:3004'

  //BACKEND VARIABLES

};

export default config;
