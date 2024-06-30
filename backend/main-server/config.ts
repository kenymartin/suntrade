import * as dotenv from "dotenv";
dotenv.config();

interface Config {
  //JWT VARIABLES
  jwSecrect?: string;
  jwExpiredIn: string;
  refreshTokenSecret(): string|undefined;
  ///SMTP VARIBALES
  smtpService?: string;
  smtpUser?: string;
  smtpPassword: string;
  //DEVELOPERS VARIABLES
  noficationEmail: {
    Me: string;
    All: string|string[]
  };
  currentUser:{
    username: string
    userId: string
  }
}
const config: Config = {
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
  noficationEmail: {
    Me: process.env.NOFICATION_EMAIL_ME,
    All: process.env.NOFICATION_EMAIL_ALL.split(';'),
  },
  currentUser:{
    userId:'',
    username:''
  }
};

export default config;
