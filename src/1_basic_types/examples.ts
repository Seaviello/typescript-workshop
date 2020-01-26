// ----------------------------------------NORMAL-------------------------------------
let isDone: boolean = false;
let age: number = 28; // or 28.0
let bigNumber: bigint = 100n; // or BigInt(100)
let loveSymbol: symbol = Symbol("Love");

let name: string = "Tomasz";
// ERROR: name = 0;
// ERROR: name = null;
// ERROR: name = undefined;

let nullableName: string | null = "Michal";
nullableName = null;
// ERROR: name = undefined;

let unstructuredPerson: object; // which means anything except for
// string, number, bigint, symbol, boolean, undefined or null

unstructuredPerson = { whatever: "nobody cares" };
unstructuredPerson = ["I", "can", "put", "anything"];
unstructuredPerson = () => {};
// ERROR: person = null
// ERROR: person = 'Tomasz Michal'

// ----------------------------------------COMPLEX-------------------------------------
let person: { name: string; age: number };
person = { name, age };
// ERROR: person = {name: null}

let numbers: number[] = [1, 1, 2, 3, 5, 8]; // also Array<number>
let heightAndUnit: [number, string] = [188, "cm"];
// ERROR: heightAndUnit = ['188', 'cm']
// ERROR: heightAndUnit = [188, 'c', 'm']

let idMaker = (age: number, name: string) => `${name}${age}`; // inferred string as return value
idMaker(78, "ABUELA").toLowerCase();
// ERROR: idMaker('Tomasz', 28).toLowerCase();

let explicitIdMaker: (age: number, name: string) => string = (age, name) =>
  `${name}${age}`;
// ERROR: let idMaker = (age, name) => `${name}${age}`;

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
/* Mapped enum to string
const colorToPaint:  {[key in NamedColor]: string} = {
  [NamedColor.BLUE]: 'sky blue',
  [NamedColor.WHITE]: 'pearl white',
  [NamedColor.RED]: 'ruby red',
}
colorToPaint[NamedColor.RED]
*/

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
