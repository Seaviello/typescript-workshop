function wrongZeroOf<T extends number | string | boolean>(
  value: T
): number | string | boolean {
  return typeof value === "number" ? 0 : typeof value === "string" ? "" : false;
}

// ERROR: wrongZeroOf(22).toFixed(1)

type ZeroOf<T extends number | string | boolean> = T extends number
  ? 0
  : T extends string
  ? ""
  : false;

function zeroOf<T extends number | string | boolean>(value: T) {
  return (typeof value === "number"
    ? 0
    : typeof value === "string"
    ? ""
    : false) as ZeroOf<T>;
}

zeroOf(22); // 0
zeroOf("Tomasz").replace(/ /, ""); // ''

interface Human {
  surname: string;
  age: number;
  jobPosition?: string;
  parent: Human | null;
}

const david: Human = {
  surname: "Davidson",
  age: 33,
  parent: null
};

type NullableProperty<T> = T extends null | undefined ? T : never;
type Nullable<T> = {
  [P in keyof T]: NullableProperty<T[P]>;
};

type NullablePersonProps = Nullable<Human>; // {jobPosition, parent}

type FlattenToString<T> = T extends Array<any> ? string : T;

const flattenedOrUntouched = <T extends any>(
  maybeArray: T
): FlattenToString<T> => {
  if (Array.isArray(maybeArray)) {
    return maybeArray.join(" ");
  } else {
    return maybeArray as FlattenToString<T>;
  }
};

const fromArray = flattenedOrUntouched(["tomato", "watermelon", "cat"]);
const fromNumber = flattenedOrUntouched(11);

type BoxValue<T> = { value: T };
type Boxed<T> = T extends NonNullable<object> ? T : BoxValue<T>;

const isObject = <K extends NonNullable<object>>(val: any): val is K =>
  val && typeof val === "object";

const boxify = <T extends any>(val: T): Boxed<T> => {
  if (isObject(val)) {
    // typeof val === 'object' is not enough
    return val;
  } else {
    return {
      value: val
    } as Boxed<T>;
  }
};

const boxedObject = boxify(david); // Human
const boxedNull = boxify(null); // BoxedValue<null>
const boxedTomato = boxify("tomato"); // BoxedValue<string>

type Unboxed<T> = T extends Array<infer K> ? K : never;

const getFirstFromArray = <T extends Array<any>>(value: T): Unboxed<T> => {
  return value[0];
};
const firstString = getFirstFromArray(["tomato", "watermelon", "cat"]); // string
const retrievedHuman = getFirstFromArray([david]); // Human

export {}
