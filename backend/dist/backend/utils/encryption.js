"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backendEncryptionUtils = void 0;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
// Create a 32-byte key from a secret using SHA-256
const secretKey = crypto_1.default.createHash('sha256')
    .update('uVQy7E8lW3s2cXa1dRfH9jN5vGbTcFhK') // Replace with your actual secret or use an environment variable
    .digest(); // This ensures the key is exactly 32 bytes
// const secretKey = crypto.randomBytes(32); 
exports.backendEncryptionUtils = {
    encrypt(text) {
        let result = "";
        try {
            const iv = crypto_1.default.randomBytes(16); // 16 bytes IV for AES
            const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
            //cipher.setAutoPadding(true);
            let encrypted = cipher.update(text, "utf8", "hex");
            encrypted += cipher.final("hex");
            result = `${iv.toString("hex")}:${encrypted}`; // Combine IV and encrypted text
        }
        catch (error) {
            console.error(error);
        }
        return result;
    },
    decrypt(encryptedText) {
        const [ivHex, encryptedHex] = encryptedText.split(":");
        const iv = Buffer.from(ivHex, "hex");
        const decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, iv);
        let decrypted = decipher.update(encryptedHex, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    },
};
// Test the encryption and decryption
// const originalText = '12345';
// const encryptedText = backendEncryptionUtils.encrypt(originalText);
// console.log('Encrypted:', encryptedText);
// const decryptedText = backendEncryptionUtils.decrypt(encryptedText);
// console.log('Decrypted:', decryptedText);
//# sourceMappingURL=encryption.js.map