"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_js_1 = __importDefault(require("../../../config.js"));
var enums_js_1 = require("../../../../shared/utils/enums.js");
var encryption_js_1 = require("../../../utils/encryption.js");
var transporter = nodemailer_1.default.createTransport({
    service: config_js_1.default.smtpService,
    auth: {
        user: config_js_1.default.smtpUser, // Your Gmail email address
        pass: config_js_1.default.smtpPassword, // Your Gmail password or an App Password if you have 2-step verification enabled
    },
});
var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    NotificationService.sendNotification = function () {
        return __awaiter(this, arguments, void 0, function (notificationType, emailOptions /*IEmailOptions*/, callback) {
            var option, jsonOptions, encriptedOpts, url, _a, subject, html;
            if (notificationType === void 0) { notificationType = enums_js_1.NotificationType.Registration; }
            return __generator(this, function (_b) {
                debugger;
                emailOptions.from = config_js_1.default.smtpUser;
                option = {
                    id: emailOptions.key,
                    isReactivation: notificationType == enums_js_1.NotificationType.Reactivation,
                };
                jsonOptions = JSON.stringify(option);
                encriptedOpts = encryption_js_1.backendEncryptionUtils.encrypt(jsonOptions);
                url = "{".concat(config_js_1.default.frontendUrl, "/{0}?opts=").concat(encodeURIComponent(encriptedOpts));
                _a = this.getNotificationContent(notificationType, url), subject = _a.subject, html = _a.html;
                emailOptions.subject = subject;
                emailOptions.html = html;
                try {
                    transporter.sendMail(emailOptions, callback);
                    return [2 /*return*/, true];
                }
                catch (error) {
                    callback(error, null);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    NotificationService.getNotificationContent = function (notificationType, url) {
        debugger;
        switch (notificationType) {
            case enums_js_1.NotificationType.Registration:
                url = url.replace('{0}', 'confirm-registration');
                return {
                    subject: "Registration Notification",
                    html: "Thank you for getting registered, please click <a href='".concat(url, "'><strong> here</strong> </a>"),
                };
            case enums_js_1.NotificationType.ChangePassword:
                url = url.replace('{0}', 'changepassword');
                return {
                    subject: "Change Password Notification",
                    html: "If you have requested a password change, please click <a href='".concat(url, "'> here </a>"),
                };
            case enums_js_1.NotificationType.ForgotPassword:
                url = url.replace('{0}', 'forgotpasswordlink');
                return {
                    subject: "Forgot Password Notification--",
                    html: "If you have forgotten your password, please click <a href='".concat(url, "'> here </a>"),
                };
            case enums_js_1.NotificationType.Error:
                return {
                    subject: "Error Notification",
                    html: "An error has occurred within the method.",
                };
            case enums_js_1.NotificationType.Reactivation:
                return {
                    subject: "Reactivation Notification",
                    html: "Your account has been reactivated, please click <a href='".concat(url, "'> here </a>"),
                };
            default:
                return {
                    subject: "Notification",
                    html: "",
                };
        }
    };
    NotificationService.replaceUrl = function (url, page) {
        return url.replace('{0}', page);
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
exports.default = { NotificationService: NotificationService };
//# sourceMappingURL=NotificationService.js.map