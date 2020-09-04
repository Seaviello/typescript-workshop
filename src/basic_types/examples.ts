// ----------------------------------------NORMAL-------------------------------------
import { log } from '../utils';

let isDone = false;
let age = 28; // or 28.0
let bigNumber = BigInt(100); // not that interesting for most of the cases
let symbolOfLove = Symbol('Love');

let name = 'Tomasz';
// ERROR: name = 0;
// ERROR: name = null;
// ERROR: name = undefined;

symbolOfLove = Symbol('Hate'); // type symbol means, that you can still change it's value to another symbol
const symbolOfTrueLove: unique symbol = Symbol('True love'); // unique symbol, means THAT specific symbol

let nullableName: string | null = 'Michal';
nullableName = null;
// ERROR: nullableName = undefined;
let unstructuredPerson: object; // which means everything except for
// string, number, bigint, symbol, boolean, undefined or null

unstructuredPerson = { whatever: 'nobody cares' };
unstructuredPerson = ['I', 'can', 'put', 'anything'];
unstructuredPerson = () => {};
// ERROR: unstructuredPerson = null             // primitive
// ERROR: unstructuredPerson = 'Tomasz Michal'  // also primitive, not allowed

// ----------------------------------------COMPLEX-------------------------------------
let person: { name: string; age: number }; // <-- atypical, use interface
person = { name, age };
// ERROR: person = {name: null}

let numbers: number[] = [1, 1, 2, 3, 5, 8]; // can be used also as Array<number>
let heightAndUnit: [number, string] = [188, 'cm']; // tuple of specific types
// ERROR: heightAndUnit = ['188', 'cm']
// ERROR: heightAndUnit = [188, 'c', 'm']

let idMaker = (age: number, name: string) => `${name}_${age}`; // inferred string as return value
idMaker(78, 'ABUELA').toLowerCase();
// ERROR: idMaker('Tomasz', 28).toLowerCase();

let explicitReturnType = (age: number, name: string): string => `${name}_${age}`;
let excplicitWholeFunction: (age: number, name: string) => string = (age, name) => `${name}${age}`;

/*
Standard ways to provide type for function
const f = (arg: Type) => {...}              // inferred return type, good for most of the cases
const g = (arg: Type): ReturnT => {...}     // explicit return type if we want to narrow down, or make function compliant with some constraints

type FunType = (arg: Type) => ReturnT;      // reusable type for whole function
const h: FunType = (arg) => {...};

function i (arg: Type): ReturnT {...}
*/

enum Color {
  RED,
  WHITE,
  BLUE // by default numbers
}

enum NamedColor {
  RED = 'red',
  WHITE = 'white',
  BLUE = 'blue'
}

const colorToPaint = (color: NamedColor) => {
  switch (color) {
    case NamedColor.BLUE:
      return 'sky blue';
    case NamedColor.RED:
      return 'ruby red';
    case NamedColor.WHITE:
      return 'pearl white';
  }
};

// ----------------------------------------SPECIAL-------------------------------------

let whatever: any;
whatever = [];
whatever = 54.0;
whatever = null;
// NO COMPILE TIME ERROR: whatever.toLowerCase()
// NO COMPILE TIME ERROR: whatever.property

let whatsThat: unknown;

whatsThat = [];
whatsThat = 54.0;
// ERROR: whatsThat.toLowerCase()
const fun = (prop: unknown) => (typeof prop === 'string' ? prop.toLowerCase() : prop);

function throwingException(message: string): never {
  throw new Error(message);
}

function logError(message: string): void {
  console.error(message);
  // or return;
}

export {};
