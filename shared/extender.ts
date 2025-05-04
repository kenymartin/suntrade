

interface String {
  /**
   * Returns a string with the first letter capitalized.
   */
  capitalize(): string;
  toInt(): number;
  toFloat(): number;
  toDate(): Date;
  toBool(): boolean;
  isNumber(): boolean;
  tryParse<T>():{value:T|undefined,success:boolean}
  defaulValue(value?:string):string
}
interface Number  {
  /**
   * Returns the number as a string with commas.
   */
  format(): string;
  toCurrency(): string;
  toPercent(): string;
  toFixed(): string;
  toInt(): number;
  ToFloat(): number;
  toDate(): Date;
  toBool(): boolean;
  isNumber(): boolean;
  tryParse<T>():{value:T|undefined,success:boolean}
  defaultValue():number

}

interface Array<T> {
  /**
   * Returns the first element of the array.
   */
  first(): T;
  /**
   * Returns the last element of the array.
   */
  last(): T;

  
}

interface Object {
  /**
   * Returns the keys of the object.
   */
  keys(): string[];
  toByte(): number;
 
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.toInt = function () {
  const result = this.tryParse<number>();
  let value: number = 0;
  if (result.success) {
    value = result.value!;
  }
  return value;
}
String.prototype.toBool =function(){
  return this.valueOf() === "true";
}
String.prototype.toFloat = function () {
  return parseFloat(this.valueOf());
}
String.prototype.toDate = function () {
  return new Date(this.valueOf());
}
String.prototype.isNumber = function () {
  return !isNaN(this.toInt());
}
String.prototype.defaulValue = function (value: string='') {
  return this.valueOf() ? this.valueOf() : value;
}
String.prototype.tryParse = function <T>(): { value: T, success: boolean } {
  try {
    return { value: JSON.parse(this.valueOf()), success: true };
  } catch (error) {
    return { value: undefined as T, success: false };
  }
}
String.prototype.toByte = function () {
  return this.length;
}
Array.prototype.first = function <T>(): T {
  return this[0];
}
Array.prototype.last = function <T>(): T {
  return this[this.length - 1];
}
Number.prototype.format = function (): string {
  return this.toLocaleString();
}
Number.prototype.toCurrency = function (): string {
  return this.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
Number.prototype.toPercent = function (): string {
  return this.toLocaleString("en-US", { style: "percent", minimumFractionDigits: 2 });
}
Number.prototype.toDate = function (): Date {
  return new Date(this.valueOf());
}
Number.prototype.isNumber = function () {
  return !isNaN(this.valueOf());
}
Number.prototype.tryParse = function <T>(): { value: T, success: boolean } {
  try {
    return { value: JSON.parse(this.valueOf().toString()), success: true };
  } catch (error) {
    return { value: undefined as T, success: false };
  }
}

Array.prototype.first = function () {
  return this[0];
}
Array.prototype.last = function () {
  return this[this.length - 1];
}
Object.prototype.keys = function () {
  return Object.keys(this);
}


