

interface String {
    toCapitalize(value: string): string;
    toNumber(defaultvalue: number): number|undefined;
    toDate(value: string):Date;
    toBoolean(value: string): boolean;
    tryParse<T>(): { value: T, success: boolean };
    
}
interface Number {
    isEven(): boolean;
    isOdd(): boolean;
    
}
interface Date {
    isToday(): boolean;
    isYesterday(): boolean;
    isTomorrow(): boolean;
    isWeekend(): boolean;
    isWeekday(): boolean;
    isBetween(start: number, end: number): boolean;
}

String.prototype.toCapitalize = function (): string {
    return this.valueOf().charAt(0).toUpperCase() + this.valueOf().slice(1);
}

String.prototype.toNumber = function (defaulvalue: number=0): number|undefined {
    
    return this.tryParse().success ? Number(this.valueOf()) : defaulvalue;
}

String.prototype.toDate = function (): Date {
    return new Date(this.valueOf())
}

String.prototype.toBoolean = function (): boolean {
    return this === "true";
}
String.prototype.tryParse = function <T>(): { value: T, success: boolean } {
    try {
      return { value: JSON.parse(this.valueOf()), success: true };
    } catch (error) {
      return { value: undefined as T, success: false };
    }
  }

Number.prototype.isEven = function (): boolean {
    return this.valueOf() % 2 === 0;
}

Number.prototype.isOdd = function (): boolean {
    return this.valueOf() % 2 !== 0;
}

Date.prototype.isToday = function (): boolean {
    return this.valueOf().toString() === new Date().toDateString();
}

Date.prototype.isYesterday = function (): boolean {
    return this.valueOf() === new Date().getDate() - 1;
}

Date.prototype.isTomorrow = function (): boolean {
    return this.valueOf() === new Date().getDate() + 1;
}

Date.prototype.isWeekend = function (): boolean {
    return this.getDay() === 0 || this.getDay() === 6;
}

Date.prototype.isWeekday = function (): boolean {
    return this.getDay() !== 0 && this.getDay() !== 6;
}

Date.prototype.isBetween = function (start: number, end: number): boolean {
    return this.valueOf() >= start && this.valueOf() <= end;
}
//usage of date function is between
const date = new Date(12,12,1978);
console.log(date.isBetween(12,20));






//implementation
