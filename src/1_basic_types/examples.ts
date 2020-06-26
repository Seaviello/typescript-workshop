// ----------------------------------------NORMAL-------------------------------------
let isDone: boolean = false;
let age: number = 28; // or 28.0
let bigNumber: bigint = BigInt(100);
let symbolOfLove: symbol = Symbol("Love");

let name: string = "Tomasz";
// ERROR: name = 0;
// ERROR: name = null;
// ERROR: name = undefined;

symbolOfLove = Symbol('Hate');
const symbolOfTrueLove: unique symbol = Symbol('True love');

let nullableName: string | null = "Michal";
nullableName = null;
// ERROR: nullableName = undefined;
let unstructuredPerson: object; // which means anything except for
// string, number, bigint, symbol, boolean, undefined or null

unstructuredPerson = { whatever: "nobody cares" };
unstructuredPerson = ["I", "can", "put", "anything"];
unstructuredPerson = () => {};
// ERROR: unstructuredPerson = null
// ERROR: unstructuredPerson = 'Tomasz Michal'

// ----------------------------------------COMPLEX-------------------------------------
let person: { name: string; age: number }; // <-- atypical, use interface
person = { name, age };
// ERROR: person = {name: null}

let numbers: number[] = [1, 1, 2, 3, 5, 8]; // also Array<number>
let heightAndUnit: [number, string] = [188, "cm"];
// ERROR: heightAndUnit = ['188', 'cm']
// ERROR: heightAndUnit = [188, 'c', 'm']

let idMaker = (age: number, name: string) => `${name}_${age}`; // inferred string as return value
idMaker(78, "ABUELA").toLowerCase();
// ERROR: idMaker('Tomasz', 28).toLowerCase();

let explicitReturnType = (age: number, name: string): string => `${name}_${age}`
let excplicitWholeFunction: (age: number, name: string) => string = (age, name) =>
  `${name}${age}`;

/*
const f = (arg: Type) => {...}
const g = (arg: Type): ReturnT => {...}

type FunType = (arg: Type) => ReturnT;
const h: FunType = (arg) => {...};

function i (arg: Type): ReturnT {...}
*/

enum Color {
  RED,
  WHITE,
  BLUE // by default numbers
}

enum NamedColor {
  RED = "red",
  WHITE = "white",
  BLUE = "blue"
}

const colorToPaint = (color: NamedColor) => {
  switch (color) {
    case NamedColor.BLUE:
      return "sky blue";
    case NamedColor.RED:
      return "ruby red";
    case NamedColor.WHITE:
      return "pearl white";
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
const fun = (prop: unknown) =>
  typeof prop === "string" ? prop.toLowerCase() : prop;

function throwingException(message: string): never {
  throw new Error(message);
}

function logError(message: string): void {
  console.error(message);
  // or return;
}

export {};
