"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectError = void 0;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.parseJson = parseJson;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const secretKey = crypto_1.default.randomBytes(32); // Store this securely in environment variables
const iv = crypto_1.default.randomBytes(16); // Initialization vector
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}
function decrypt(encryptedText) {
    const [ivText, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivText, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
function parseJson(jsonString) {
    return JSON.parse(jsonString);
}
class ProjectError extends Error {
    constructor(message, options) {
        super(message);
        this.errorName = options?.errorName;
        this.cause = options?.cause;
        this.data = options?.data;
    }
}
exports.ProjectError = ProjectError;
//# sourceMappingURL=utils.js.map