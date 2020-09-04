// ----------------------------------------in/typeof/instance-------------------------------------

interface Animal {
  name: string;
  dateOfBirth: string;
}

interface Person extends Animal {
  bsn: number;
  complain: () => void;
}

interface Pet extends Animal {
  makeSound: () => void;
}

const david: Person = {
  complain: () => console.log("It's raining again :/"),
  bsn: 66364123,
  name: 'David',
  dateOfBirth: '23-02-1999'
};
const kitty: Pet = {
  makeSound: () => console.log('meow'),
  dateOfBirth: '01-01-2019',
  name: 'Donut'
};

const forceToMakeSound = (obj: Person | Pet) => {
  if ('complain' in obj) {
    obj.complain(); // Person
  } else {
    obj.makeSound(); // Pet
  }
};
forceToMakeSound(david); // It's raining again :/
forceToMakeSound(kitty); // meow

// Different usage of 'in' operator
enum NamedColor {
  RED = 'red',
  WHITE = 'white',
  BLUE = 'blue'
}
const colorToPaint: { [key in NamedColor]: string } = {
  [NamedColor.BLUE]: 'sky blue',
  [NamedColor.WHITE]: 'pearl white',
  [NamedColor.RED]: 'ruby red'
};
console.log(colorToPaint[NamedColor.RED]); // 'ruby red'

const getLength = (maybeHasLength: unknown) => {
  switch (typeof maybeHasLength) {
    case 'boolean':
      return maybeHasLength ? 1 : 0;
    case 'function':
      return maybeHasLength.name.length;
    case 'number':
    case 'bigint':
      return String(maybeHasLength).length;
    case 'object':
      return maybeHasLength ? Object.keys(maybeHasLength).length : 0; // sneaky null
    case 'string':
      return maybeHasLength.length;
    default:
      return 0;
  }
};
getLength(david);
getLength(123123);
getLength(Symbol('love'));

class Point {
  constructor(public x: number, public y: number, public z?: number) {}
}

const p1 = new Point(3, 2, 1);
const p2 = new Point(-1, 0);

const add = (point1: unknown, point2: unknown) => {
  if (point1 instanceof Point && point2 instanceof Point) {
    return new Point(point1.x + point2.x, point2.y + point1.y, (point1.z || 0) + (point2.z || 0));
  }
  return new Point(0, 0, 0);
};
const p3 = add(p1, p2);
const p4 = add(p1, 'tomato');

// ----------------------------------------is/assert-------------------------------------

const isPerson = (obj: any): obj is Person => obj.bsn; // Runtime check that will give us information about type

const forceToMakeSound_2 = (obj: Person | Pet) => {
  if (isPerson(obj)) {
    obj.complain();
  } else {
    obj.makeSound();
  }
};

/*

NODE ENVIRONMENT
function assertIsPerson(val: any): asserts val is Person {
  if (!val.bsn) {
    throw new AssertionError(
      `Expected 'val' to be Person`
    );
  }
}

const forceToMakeSound_3 = (obj: Person | Pet) => {
  assertIsPerson(obj);
  obj.complain(); // only Person
};

 */
export {};
