import crypto from 'crypto';


const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32); // Store this securely in environment variables
const iv = crypto.randomBytes(16); // Initialization vector

export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
    const [ivText, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivText, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
export function parseJson<T>(jsonString: string): T {
  return JSON.parse(jsonString);
}

type ErrorName =
  | "GET_PROJECT_ERROR"
  | "POST_PROJECT_ERROR"
  | "PATCH_PROJECT_ERROR"
  | "DELETE_PROJECT_ERROR"
  | "PUT_PROJECT_ERROR";

export class ProjectError extends Error {
  data?: any;
  cause?: any;
  errorName?: ErrorName;

  constructor(message: string, options?: { errorName?: ErrorName; cause?: any; data?: any }) {
    super(message);
    this.errorName = options?.errorName;
    this.cause = options?.cause;
    this.data = options?.data;
  }
}