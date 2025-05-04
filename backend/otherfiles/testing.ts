import { getuid } from "process";

/**
 * Represents a person with a first name and a last name.
 * @property {string} firstname - The first name of the person.
 * @property {string} lastname - The last name of the person.
 * @property {string} getfullname - A getter function that returns the full name of the person.
 */
const person =  {
  firstname: "John",
  lastname: "Smith",
  get getfullname() {
    return this.firstname + " " + this.lastname;
  },
};

const employee = {
  firstname: "Karen",
  lastname: "Smith",
};

const person2 = Object.assign({ id: process.geteuid }, employee, {
  firstname: "John33",
});
Object.freeze(person2)
//Object.seal(person)


/**
 * Sets the properties of a person object.
 * @param {object} person - The person object to set properties for.
 * @returns None
 */
function setPerson(person: { firstname: string; lastname: string; readonly getfullname: string; }){
    //console.log(person.firstname="John")
    //console.log(person.fullaname="Smith")
    
}
setPerson(person)

const book = {
  title: 'Brave New World',
  author: 'Aldous Huxley',
}

function summary(this: any) {
  console.log(`${this.title} was written by ${this.author}.`)
}
const sum = (...number: number[][]) => number.reduce((cc, number) => cc + number[0], 0);
const numbers=[1,3,4,5]
console.log(sum(numbers))
//onsole.log(sum(5,6,1,1))
//summary.apply(book)