"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_js_1 = __importDefault(require("../../../config.js"));
const enums_js_1 = require("../../../../shared/utils/enums.js");
//import {encrypt} from "../../../../shared/utils/utils.js";
const encryption_js_1 = require("../../../utils/encryption.js");
const transporter = nodemailer_1.default.createTransport({
    service: config_js_1.default.smtpService,
    auth: {
        user: config_js_1.default.smtpUser, // Your Gmail email address
        pass: config_js_1.default.smtpPassword, // Your Gmail password or an App Password if you have 2-step verification enabled
    },
});
class NotificationService {
    static async sendNotification(notificationType = enums_js_1.NotificationType.Registration, emailOptions /*IEmailOptions*/, callback) {
        debugger;
        emailOptions.from = "kmartinrobles@gmail.com";
        const option = {
            id: emailOptions.key,
            isReactivation: notificationType == enums_js_1.NotificationType.Reactivation,
        };
        const jsonOptions = JSON.stringify(option);
        const encriptedOpts = encryption_js_1.backendEncryptionUtils.encrypt(jsonOptions);
        //http://localhost:5173/confirm-registration?
        const registrationUrl = `http://localhost:5173/{0}?opts=${encodeURIComponent(encriptedOpts)}`;
        // const registrationUrl = `http://localhost:5173/confirm-registration?id=${encodeURIComponent(encryptedId)}&options?${encodeURIComponent(encriptedOpts)}`;
        const { subject, html } = this.getNotificationContent(notificationType, registrationUrl);
        emailOptions.subject = subject;
        emailOptions.html = html;
        try {
            transporter.sendMail(emailOptions, callback);
            return true;
        }
        catch (error) {
            callback(error, null);
            return false;
        }
    }
    static getNotificationContent(notificationType, url) {
        debugger;
        switch (notificationType) {
            case enums_js_1.NotificationType.Registration:
                url = url.replace('{0}', 'confirm-registration');
                return {
                    subject: "Registration Notification",
                    html: `Thank you for getting registered, please click <a href='${url}'><strong> here</strong> </a>`,
                };
            case enums_js_1.NotificationType.ChangePassword:
                url = url.replace('{0}', 'changepassword');
                return {
                    subject: "Change Password Notification",
                    html: `If you have requested a password change, please click <a href='${url}'> here </a>`,
                };
            case enums_js_1.NotificationType.ForgotPassword:
                url = url.replace('{0}', 'forgotpasswordlink');
                return {
                    subject: "Forgot Password Notification--",
                    html: `If you have forgotten your password, please click <a href='${url}'> here </a>`,
                };
            case enums_js_1.NotificationType.Error:
                return {
                    subject: "Error Notification",
                    html: `An error has occurred within the method.`,
                };
            case enums_js_1.NotificationType.Reactivation:
                return {
                    subject: "Reactivation Notification",
                    html: `Your account has been reactivated, please click <a href='${url}'> here </a>`,
                };
            default:
                return {
                    subject: "Notification",
                    html: "",
                };
        }
    }
    static replaceUrl(url, page) {
        return url.replace('{0}', page);
    }
}
exports.NotificationService = NotificationService;
exports.default = { NotificationService };
//# sourceMappingURL=NotificationService.js.map