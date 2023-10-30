import nodemailer from "nodemailer";
import { NotificationType } from "../shared/utils/enums.js";
import IEmailOptions from "./interfaces/IEmailoptions.js";
import config from "../config.js";
const transporter = nodemailer.createTransport({
  service: config.smtpService,
  auth: {
    user: config.smtpUser, // Your Gmail email address
    pass: config.smtpPassword, // Your Gmail password or an App Password if you have 2-step verification enabled
  },
});

export class NotificationService {
  static Send = async function (notificationType: NotificationType = NotificationType.Resistration,opts: any,callback: any): Promise<void> {
  
    const options = <IEmailOptions>opts;
    options.from = "kmartinrobles@gmail.com";
    const url = encodeURI("http://emubeship.com/home");
    
    switch (notificationType) {
      case NotificationType.Resistration:
        options.subject = "Registration Notification";
        options.html = `Thank you for getting registered, please click <a href='${url}'><strong> here</strong> </a>`;
        break;
      case NotificationType.ChangePassword:
        options.subject = "Change Password Notification";
        options.html = `If you have requested a password change,please click <a href=${url}> here </a>`;

      case NotificationType.ForgotPassword:
        options.subject = "Forgot Password Notification";
        options.html = `If you have forgotten your password, please click <a href='${url}'> here </a>`;
      
      case NotificationType.Error:
        options.subject= "Error Nofication";
        options.html =`An error has occurred wihin the method ${{}}`
        default:
        break;
    }
    new Promise((resolve, reject) => {
      try {
        resolve(
          transporter.sendMail(options, (err, info) => {
            callback(err, info);
          })
        );
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default { NotificationService };
