"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultError = void 0;
exports.generateSecretKey = generateSecretKey;
exports.pushElement = pushElement;
var crypto_1 = __importDefault(require("crypto"));
function generateSecretKey(size) {
    if (size === void 0) { size = 64; }
    return crypto_1.default.randomBytes(size).toString("hex");
}
/**
 * The pushElement function is a flexible utility designed to copy elements from an array (source) into another array (target). It is intended for scenarios where the objects within the source array may have varying structures, making it suitable for handling diverse data types.
 * @param target  (Type: Array of Generic Type T): This is the destination array where the elements from the source array will be added.
 * @param source An array of elements to copy into the target array. The source array must contain at least one element.
 * @returns {number} The number of elements copied into the target array.
 */
function pushElement(target, source) {
    try {
        if (!source)
            return;
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var element = source_1[_i];
            if (element instanceof Object && !(element instanceof Array)) {
                target.push(element);
            }
        }
    }
    catch (error) {
        throw new Error("Error pushing element to target array: ".concat(error));
    }
    return target.length;
}
exports.default = Object.defineProperty(String.prototype, "ToInt", {
    value: function ToInt(value2) {
        try {
            return parseInt(value2, 10);
        }
        catch (error) {
            return 0;
        }
    },
    writable: true,
    configurable: true,
});
/**
 * Static class for handling service error
 */
var ResultError = /** @class */ (function () {
    function ResultError() {
    }
    ResultError.TriedGetOne = function (name) {
        throw new Error("An error ocurred while trying to fetch the ".concat(name));
    };
    ResultError.TriedActiveUser = function (name) {
        throw new Error("An error ocurred while trying to activate the ".concat(name));
    };
    ResultError.TriedGetMany = function (name) {
        throw new Error("An error ocurred while trying to fetch the ".concat(name, "s"));
    };
    ResultError.TriedUpdateOne = function (name) {
        throw new Error("An error ocurred while trying to update the ".concat(name));
    };
    ResultError.TriedUpdateMany = function (name) {
        throw new Error("An error ocurred while trying to update the ".concat(name, "s"));
    };
    ResultError.TriedCreateOne = function (name) {
        throw new Error("An error ocurred while trying to create the ".concat(name));
    };
    ResultError.TriedCreateMany = function (name) {
        throw new Error("An error ocurred while trying to fetch the ".concat(name, "s"));
    };
    ResultError.TriedDeleteOne = function (name) {
        throw new Error("An error ocurred while trying to delete the ".concat(name));
    };
    ResultError.Nofity = function (info) {
        console.log("========Notify method======", info.methodName);
        /*mail.NotificationService.Send(NotificationType.Error,
          {
            email: config.noficationEmail.Me,
            ServerError: {
              methodName: info.methodName,
              lineError: info.lineError,
              layer: info.layer,
            },
          },
          (err: any, info: any) => {
            if (err) {
              console.log("Error: ", err);
            } else {
              console.log("Email sent ", info.response);
            }
          }
        );*/
    };
    return ResultError;
}());
exports.ResultError = ResultError;
// export { generateSecretKey, pushElement, ResultError };
//# sourceMappingURL=utils.js.map