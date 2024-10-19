import nodemailer from "nodemailer";
// import  NotificationType  from "@shared/utils/enums.js";
import IEmailOptions from "./interfaces/IEmailoptions.js";
import config from "../../../config.js";
import { NotificationType } from "../../../../shared/utils/enums.js";
//import {encrypt} from "../../../../shared/utils/utils.js";
import { backendEncryptionUtils } from "../../../utils/encryption.js";

// import _ from "lodash";
type app = {
  page: "confirm-registration" | "forgot-password";
};
const transporter = nodemailer.createTransport({
  service: config.smtpService,
  auth: {
    user: config.smtpUser, // Your Gmail email address
    pass: config.smtpPassword, // Your Gmail password or an App Password if you have 2-step verification enabled
  },
});

export class NotificationService {
  
  
  static async sendNotification(notificationType: NotificationType = NotificationType.Registration,emailOptions:any /*IEmailOptions*/,callback: (error: any, info: any) => void): Promise<boolean> {
    debugger
    emailOptions.from = "kmartinrobles@gmail.com";
    const option = {
      id: emailOptions.key,
      isReactivation: notificationType == NotificationType.Reactivation,
    };
    
    const jsonOptions =JSON.stringify(option);
    const encriptedOpts =backendEncryptionUtils.encrypt(jsonOptions);
    //http://localhost:5173/confirm-registration?
    
    const registrationUrl = `http://localhost:5173/{0}?opts=${encodeURIComponent(encriptedOpts)}`;
    // const registrationUrl = `http://localhost:5173/confirm-registration?id=${encodeURIComponent(encryptedId)}&options?${encodeURIComponent(encriptedOpts)}`;
    const { subject, html } = this.getNotificationContent(
      notificationType,
      registrationUrl
    );
    emailOptions.subject = subject;
    emailOptions.html = html;

    try {
      transporter.sendMail(emailOptions, callback);
      return true
    } catch (error) {
      callback(error, null);
      return false
    }
  }

  private static getNotificationContent(notificationType: NotificationType,url: string): { subject: string; html: string } {
    debugger
    switch (notificationType) {
      case NotificationType.Registration:
        url =url.replace('{0}','confirm-registration')
        return {
          subject: "Registration Notification",
          html: `Thank you for getting registered, please click <a href='${url}'><strong> here</strong> </a>`,
        };
      case NotificationType.ChangePassword:
        url =url.replace('{0}','changepassword')
        return {
          subject: "Change Password Notification",
          html: `If you have requested a password change, please click <a href='${url}'> here </a>`,
        };
      case NotificationType.ForgotPassword:
        url =url.replace('{0}','forgotpasswordlink')
        return {
          subject: "Forgot Password Notification--",
          html: `If you have forgotten your password, please click <a href='${url}'> here </a>`,
        };
      case NotificationType.Error:
        return {
          subject: "Error Notification",
          html: `An error has occurred within the method.`,
        };
      case NotificationType.Reactivation:
        return {
          subject: "Reactivation Notification",
          html: `Your account has been reactivated, please click <a href='${url}'> here </a>`,
        }
      default:
        return {
          subject: "Notification",
          html: "",
        };
    }
  }
  
  private static replaceUrl(url: string, page:app['page']): string {
    return url.replace('{0}',page)
  }
}

export default { NotificationService };
