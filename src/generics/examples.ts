// ----------------------------------------INTRO-------------------------------------

const boxAny = (value: any) => ({ value, isObject: typeof value === 'object' });
boxAny('Tomasz').value.toLowerCase();
//NO COMPILE ERROR: boxAny('Tomasz').value.notExistingProperty();

const boxUnknown = (value: unknown) => ({
  value,
  isObject: typeof value === 'object'
});
//COMPILE ERROR: boxUnknown('Tomasz').value.toLowerCase();
//COMPILE ERROR: boxUnknown('Tomasz').value.notExistingProperty();

const boxGeneric = <T>(value: T) => ({
  value,
  isObject: typeof value === 'object' // T extends object <--- NOT A RUNTIME VARIABLE, JUST A TYPE
});
// NOBODY WOULD DO THAT: const boxedString = boxGeneric<string>("ToMaSz");
const boxedString = boxGeneric('ToMaSz'); // {value: string, isObject: boolean}
console.log(boxedString.value.toLowerCase()); // tomasz
//COMPILE ERROR: boxedString.value.notExistingProperty();

const boxedPromise = boxGeneric(Promise.resolve('yasss')); // {value: Promise<string>, isObject: boolean}
boxedPromise.value.then((resolved) => console.log(resolved.toUpperCase())); // 'YASSS'

interface Box<T> {
  value: T;
  isObject: boolean;
}

type BoxType<T> = { value: T; isObject: boolean };

const typedBoxedPromise: Box<Promise<string>> = boxGeneric(Promise.resolve('yaaassss'));

/*
Generic syntax overview

const f = <ArgType, ReturnType>(arg: ArgType): ReturnType => {...}  // won't work in TSX files unfortunately
function g<ArgType, ReturnType>(arg: ArgType): ReturnType {...}     // it will always work

interface GenericIdentityFn {                                       // callable generic interface
  <T>(arg: T): T;
}

interface GenericInterface<T> {                                       // callable generic interface
  (arg: T): T;
  data: Array<T>;
}

class GenericClass<Config> {
  new (config: Config): Component<Config>;
}

type GenericType<T> = ...

*/

// ----------------------------------------keyof-------------------------------------

interface Person {
  age: number;
  readonly name: string;
  jobPosition?: string;
  partner?: Person;
}

const david: Person = {
  age: 30,
  name: 'David',
  partner: { age: 20, name: 'Samantha' }
};

type personProperties = keyof Person; // Person is type -> 'age' | 'name' | 'jobPosition' | 'partner'
type personPropertiesFromDavid = keyof typeof david; // david is value

type personValueTypes = Person[keyof Person]; // number | string | Person | undefined
// const getPersonValue = (obj: Person, key: personProperties, fallback: personValueTypes) => obj[key] || fallback
// const badGetPersonValue = <K>(obj: Person, key: K, fallback: Person[K]) => obj[key] || fallback; <--- nooo, how do you know that K exists on Person?
const getPersonValue = <K extends personProperties>(obj: Person, key: K, fallback: Person[K]) => obj[key] || fallback;

const maybeGetValue = <T, K extends keyof T>(obj: T, key: K, fallback: T[K]) => obj[key] || fallback;
const age = maybeGetValue(david, 'age', 1); // type: number; value: 30
const maybeJobPosition = maybeGetValue(david, 'jobPosition', 'freelancer'); // type: string | undefined (because of optional); value: 'freelancer'

// extends keyof <-- limits the value fully to the keyset
// ERROR maybeGetProp(david, 'fullName', 'whatever')

const getValue = <T, K extends keyof T>(obj: T, key: K, fallback: Required<T>[K]) => obj[key] || fallback;
const jobPosition = getValue(david, 'jobPosition', 'freelancer'); // type: string; value: 'freelancer'
// ERROR const wrongJobPosition = getValue(david, 'jobPosition', 66)

const jobOrAge = getValue(david, Math.random() > 0.5 ? 'jobPosition' : 'age', 'freelancer'); // type: string | number, everything legal
type jobOrAgeType = Required<Person>['jobPosition' | 'age']; // string | number

interface Pos {
  x: number;
  y: number;
  z?: number;
}
const dot: Pos = { x: 0, y: 0 };
const z = getValue(dot, 'z', 0);
export {};
