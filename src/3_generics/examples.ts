// ----------------------------------------INTRO-------------------------------------

const boxAny = (value: any) => ({ value, isObject: typeof value === "object" });
boxAny("Tomasz").value.toLowerCase();
//NO COMPILE ERROR: boxAny('Tomasz').value.notExistingProperty();

const boxUnknown = (value: unknown) => ({
  value,
  isObject: typeof value === "object"
});
//COMPILE ERROR: boxUnknown('Tomasz').value.toLowerCase();
//COMPILE ERROR: boxUnknown('Tomasz').value.notExistingProperty();


const boxGeneric = <T>(value: T) => ({
  value,
  isObject: typeof value === "object" // T extends object <--- NOT A RUNTIME VARIABLE, JUST A TYPE
});
// NOBODY WOULD DO THAT: const boxedString = boxGeneric<string>("ToMaSz");
const boxedString = boxGeneric("ToMaSz"); // {value: string, isObject: boolean}
console.log(boxedString.value.toLowerCase()); // tomasz
//COMPILE ERROR: boxedString.value.notExistingProperty();

const boxedPromise = boxGeneric(Promise.resolve("yasss")); // {value: Promise<string>, isObject: boolean}
boxedPromise.value.then(resolved => console.log(resolved.toUpperCase())); // 'YASSS'

interface Box<T>{
  value: T,
  isObject: boolean,
}

const typedBoxedPromise: Box<Promise<string>> = boxGeneric(Promise.resolve('yaaassss'));

// ----------------------------------------keyof-------------------------------------

interface Person {
  age: number;
  readonly name: string;
  jobPosition?: string;
  partner?: Person;
}

let idMaker = ({ name, age }: Person) => `${name}_${age}`;
// ERROR: idMaker({age: 30, name: 'David Davidson', firstName: 'David', lastName: 'Davidson'})

let genericIdMaker = <T extends Person>({ name, age }: T) => `${name}_${age}`;
genericIdMaker({
  age: 30,
  name: "David Davidson",
  firstName: "David",
  lastName: "Davidson"
});
// ERROR MISSING name: genericIdMaker({age: 30})

const david: Person = {
  age: 30,
  name: "David",
  partner: { age: 20, name: "Samantha" }
};
type personProperties = keyof Person;
// const getPersonValue = (obj: Person, key: personProperties, fallback: ???) => obj[key] || fallback
const getPersonProperty = <K extends personProperties>(
  obj: Person,
  key: K,
  fallback: Person[K]
) => obj[key] || fallback;

const maybeGetProperty = <T, K extends keyof T>(
  obj: T,
  key: K,
  fallback: T[K]
) => obj[key] || fallback;
const age = maybeGetProperty(david, "age", 1); // type: number; value: 30
const maybeJobPosition = maybeGetProperty(david, "jobPosition", "freelancer"); // type: string | undefined (because of optional); value: 'freelancer'
// ERROR maybeGetProp(david, 'fullName', 'whatever')

const getProperty = <T, K extends keyof T>(
  obj: T,
  key: K,
  fallback: Required<T>[K]
) => obj[key] || fallback;
const jobPosition = getProperty(david, "jobPosition", "freelancer"); // type: string; value: 'freelancer'
// ERROR const wrongJobPosition = getProperty(david, 'jobPosition', 66)

interface Pos {
  x: number,
  y: number,
  z?: number,
}
const dot: Pos = {x: 0, y: 0}
const z = getProperty(dot, 'z', 0);
