function wrongZeroOf<T extends number | string | boolean>(value: T): number | string | boolean {
  return typeof value === 'number' ? 0 : typeof value === 'string' ? '' : false;
}

// ERROR: wrongZeroOf(22).toFixed(1)

type ZeroOf<T> = T extends number ? 0 : T extends string ? '' : T extends boolean ? false : null;

function zeroOf<T>(value: T) {
  return (typeof value === 'number'
    ? 0
    : typeof value === 'string'
    ? ''
    : typeof value === 'boolean'
    ? false
    : null) as ZeroOf<T>;
}

zeroOf(22); // 0
zeroOf('Tomasz').replace(/ /, ''); // ''

interface Human {
  surname: string;
  age: number;
  jobPosition?: string;
  parent: Human | null;
}

const david: Human = {
  surname: 'Davidson',
  age: 33,
  parent: null
};

type NullableProperty<T> = T extends null | undefined ? T : never;
type Nullable<T> = {
  [P in keyof T]: NullableProperty<T[P]>;
};

type NullablePersonProps = Nullable<Human>; // {jobPosition, parent}

type FlattenToString<T> = T extends Array<any> ? string : T;

const flattenedOrUntouched = <T extends any>(maybeArray: T): FlattenToString<T> => {
  if (Array.isArray(maybeArray)) {
    return maybeArray.join(' ');
  } else {
    return maybeArray as FlattenToString<T>;
  }
};

const fromArray = flattenedOrUntouched(['tomato', 'watermelon', 'cat']);
const fromNumber = flattenedOrUntouched(11);

type Unboxed<T> = T extends Array<infer K> ? K : never;

const getFirstFromArray = <T extends Array<any>>(value: T): Unboxed<T> => {
  return value[0];
};
const firstString = getFirstFromArray(['tomato', 'watermelon', 'cat']); // string
const retrievedHuman = getFirstFromArray([david]); // Human

type Nullify<T> = {
  [P in keyof T]: T[P] | null;
};

interface SuccessData {
  data: { id: string; count: number };
}
interface ErrorData {
  error: string;
}

type Combine<T> = T extends infer A | infer B ? Nullify<A> & Nullify<B> : T;

type ReturnData = Combine<SuccessData | ErrorData>;
const errorData: ReturnData = { error: 'No records found', data: null };
const data: ReturnData = { data: { id: '4', count: 3 }, error: null };

export {};
