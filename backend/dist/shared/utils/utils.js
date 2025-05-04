"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectError = void 0;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.parseJson = parseJson;
var crypto_1 = __importDefault(require("crypto"));
var algorithm = 'aes-256-cbc';
var secretKey = crypto_1.default.randomBytes(32); // Store this securely in environment variables
var iv = crypto_1.default.randomBytes(16); // Initialization vector
function encrypt(text) {
    var cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
    var encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return "".concat(iv.toString('hex'), ":").concat(encrypted);
}
function decrypt(encryptedText) {
    var _a = encryptedText.split(':'), ivText = _a[0], encrypted = _a[1];
    var iv = Buffer.from(ivText, 'hex');
    var decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, iv);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
function parseJson(jsonString) {
    return JSON.parse(jsonString);
}
var ProjectError = /** @class */ (function (_super) {
    __extends(ProjectError, _super);
    function ProjectError(message, options) {
        var _this = _super.call(this, message) || this;
        _this.errorName = options === null || options === void 0 ? void 0 : options.errorName;
        _this.cause = options === null || options === void 0 ? void 0 : options.cause;
        _this.data = options === null || options === void 0 ? void 0 : options.data;
        return _this;
    }
    return ProjectError;
}(Error));
exports.ProjectError = ProjectError;
//# sourceMappingURL=utils.js.map