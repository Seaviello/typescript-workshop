// ----------------------------------------INTERFACES-------------------------------------
interface Person {
  age: number;
  readonly name: string;
  jobPosition?: string;
}

interface PersonIdMaker {
  (person: Person): string;
}

const david: Person = { age: 54, name: "David" };
//COMPILE TIME ERROR// david.name = 'Tomato'

let idMaker: PersonIdMaker = ({ name, age }) => `${name}_${age}`;
idMaker(david);
idMaker({ age: 54, name: "David" }); // duck typying
// idMaker({age: 30 }) ERROR not a Person
// idMaker({age: 30, name: 'David Davidson', firstName: 'David', lastName: 'Davidson'}) ERROR still not a Person

/* Possible, but use sparsely */
interface WithOverload {
  getRandomNumber(): number;
  getRandomNumber(seed: number): number;
  getRandomNumber(seed: number, range: number): number;
}

interface WithOptional {
  getRandomNumber(seed?: number, range?: number): number;
}

// ----------------------------------------TYPES-------------------------------------
type Age = string | number;
// type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
// more dope stuff later

// ----------------------------------------CLASSES-------------------------------------
class ClassyPerson /* implements Person */ {
  age: number;
  name: string;
  lastName: string;
  private id: string;
  constructor(age: number, name: string, lastName: string) {
    this.age = age;
    this.name = name;
    this.lastName = lastName;
    this.id = `${name}_${lastName}_${age}`;
  }
  /* constructor(public age: number, public name: string, public lastName: string){

  } */
  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
  set fullName(full) {
    const [name, lastName] = full.split(" ");
    this.name = name;
    this.lastName = lastName;
  }

  static isEqual = (p1: ClassyPerson, p2: ClassyPerson) => p1.id === p2.id;
}

const classyDavidSecretAgent = new ClassyPerson(33, "David", "Davidson");
const classyDavid = new ClassyPerson(33, "David", "Davidson");
console.log(classyDavidSecretAgent.fullName); // 'David Davidson'
classyDavidSecretAgent.fullName = "Michal Michalski";
// ERROR: classyDavidSecretAgent.id
console.log(classyDavidSecretAgent.name); // 'Michal'
console.log(classyDavidSecretAgent === classyDavid); // false
console.log(ClassyPerson.isEqual(classyDavid, classyDavidSecretAgent)); // true

class SuperClassyPerson extends ClassyPerson {
  height: number;
  constructor(age: number, height: number, name: string, lastName: string, ) {
    super(age, name, lastName);
    this.height = height;
  }
}

const superClassyDavid = new SuperClassyPerson(33, 188, 'David', 'Davidson')

idMaker(classyDavid); //duck typing
idMaker(superClassyDavid); //duck typing
console.log(ClassyPerson.isEqual(classyDavid, superClassyDavid)); // true

export {};
