import CryptoJS from "crypto-js";
import { EncryptionUtils } from "../../../shared/encryptionUtils";

const secretKey = CryptoJS.enc.Hex.parse(
  CryptoJS.SHA256("uVQy7E8lW3s2cXa1dRfH9jN5vGbTcFhK").toString()
);
export const frontendEncryptionUtils: EncryptionUtils = {
  encrypt(text: string): string {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(text, secretKey, { iv });
    return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.toString()}`;
  },
  decrypt(encryptedText: string): string {
    const [ivHex, encryptedHex] = encryptedText.split(":");
    if (!ivHex || !encryptedHex) {
      throw new Error("Invalid encrypted text format.");
    }
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encrypted = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(encryptedHex),
    });
    const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    if (decrypted.sigBytes <= 0) {
      throw new Error("Decryption failed: Decrypted data is empty.");
    }
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted Text (UTF-8):", decryptedText);

    if (!decryptedText) {
      throw new Error("Decryption failed: Malformed UTF-8 data.");
    }
    return decryptedText;
  },
};
