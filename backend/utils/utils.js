import crypto from "crypto";
export function generateSecretKey(size = 64) {
    return crypto.randomBytes(size).toString("hex");
}
/**
 * The pushElement function is a flexible utility designed to copy elements from an array (source) into another array (target). It is intended for scenarios where the objects within the source array may have varying structures, making it suitable for handling diverse data types.
 * @param target  (Type: Array of Generic Type T): This is the destination array where the elements from the source array will be added.
 * @param source An array of elements to copy into the target array. The source array must contain at least one element.
 * @returns {number} The number of elements copied into the target array.
 */
export function pushElement(target, source) {
    if (!source)
        return;
    for (const element of source) {
        if (element instanceof Object && !(element instanceof Array)) {
            target.push(element);
        }
    }
    return target.length;
}
export default Object.defineProperty(String.prototype, "ToInt", {
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
export class ResultError {
    static TriedGetOne(name) {
        throw new Error(`An error ocurred while trying to fetch the ${name}`);
    }
    static TriedGetMany(name) {
        throw new Error(`An error ocurred while trying to fetch the ${name}s`);
    }
    static TriedUpdateOne(name) {
        throw new Error(`An error ocurred while trying to update the ${name}`);
    }
    static TriedUpdateMany(name) {
        throw new Error(`An error ocurred while trying to update the ${name}s`);
    }
    static TriedCreateOne(name) {
        throw new Error(`An error ocurred while trying to create the ${name}`);
    }
    static TriedCreateMany(name) {
        throw new Error(`An error ocurred while trying to fetch the ${name}s`);
    }
    static TriedDeleteOne(name) {
        throw new Error(`An error ocurred while trying to delete the ${name}`);
    }
    static Nofity(info) {
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
    }
}
// export { generateSecretKey, pushElement, ResultError };
