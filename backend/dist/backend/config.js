"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var config = {
    //JWT VARIABLES
    jwSecrect: process.env.ACCESS_TOKEN_SECRECT,
    jwExpiredIn: process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN,
    refreshTokenExpiredIn: process.env.REFRESH_TOKEN_SECRET_EXPIRES_IN,
    refreshTokenSecret: function () {
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
    },
    //FRONTEND VARIABLES
    frontendUrl: (_a = process.env.FRONTEND_URL) !== null && _a !== void 0 ? _a : 'http://localhost:5173'
};
exports.default = config;
//# sourceMappingURL=config.js.map