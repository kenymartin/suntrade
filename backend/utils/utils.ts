import crypto from "crypto";

export function generateSecretKey(size: number = 64) {
  return crypto.randomBytes(size).toString("hex");
}
/**
 * The pushElement function is a flexible utility designed to copy elements from an array (source) into another array (target). It is intended for scenarios where the objects within the source array may have varying structures, making it suitable for handling diverse data types.
 * @param target  (Type: Array of Generic Type T): This is the destination array where the elements from the source array will be added.
 * @param source An array of elements to copy into the target array. The source array must contain at least one element.
 * @returns {number} The number of elements copied into the target array.
 */
export function pushElement<T>(target: T[], source: any[]|undefined): number |undefined {
  try {
    if(!source)return
  for (const element of source) {
    if (element instanceof Object && !(element instanceof Array)) {
      target.push(element as T);
    }
  }
  } catch (error) {
    throw new Error(`Error pushing element to target array: ${error}`)
  }
  return target.length;
}

export  default Object.defineProperty(String.prototype, "ToInt", {
  value: function ToInt(value2:string):number {
      try {
        return parseInt(value2, 10);
      } catch (error) {
        return 0
      }
  },
  writable: true,
  configurable: true,
});

export type model = {
  name:
    | "Contact"
    | "User"
    | "Address"
    | "Phone"
    | "Role"
    | "Email"
    | "Order"
    | "SolarPanel"
    | "Quotation"
    | "Cards"
    | "Payment"
    | "PaymentMethod"
    | "CardType"
    | "Email"
    | "Order"
    | "Component"
    | "Sales"
    | "Company";
};
/**
 * Static class for handling service error
 */
export abstract class ResultError {
  static TriedGetOne(name: model["name"]) {
    throw new Error(`An error ocurred while trying to fetch the ${name}`);
  }
  static TriedActiveUser(name: model["name"]) {
    
    throw new Error(`An error ocurred while trying to activate the ${name}`);
  }
  static TriedGetMany(name: model["name"]) {
    throw new Error(`An error ocurred while trying to fetch the ${name}s`);
  }
  static TriedUpdateOne(name: model["name"]) {
    throw new Error(`An error ocurred while trying to update the ${name}`);
  }
  static TriedUpdateMany(name: model["name"]) {
    throw new Error(`An error ocurred while trying to update the ${name}s`);
  }
  static TriedCreateOne(name: model["name"]) {
    throw new Error(`An error ocurred while trying to create the ${name}`);
  }
  static TriedCreateMany(name: model["name"]) {
    throw new Error(`An error ocurred while trying to fetch the ${name}s`);
  }
  static TriedDeleteOne(name: model["name"]) {
    throw new Error(`An error ocurred while trying to delete the ${name}`);
  }
  static Nofity(info: {
    methodName: string;
    lineError?: number;
    layer?: string;
  }) {
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
