interface PaperProps {
  elevation?: number;
  square?: boolean;
  stack: React.ReactNode | null;
  component?: React.ElementType;
  variant: 'elevation' | 'outlined';
}

const paperProps: PaperProps = {
  elevation: 55,
  stack: null,
  variant: 'elevation'
};

type ReadonlyProps = Readonly<PaperProps>; // {readonly elevation?: number, readonly stack: React.ReactNode ...  }

type AllRequiredProps = Required<PaperProps>;
/*
{
  elevation: number;
  square: boolean;
  stack: React.ReactNode;
  component: React.ElementType<any>;
  variant: 'elevation' | 'outlined';
}*/

type AllOptionalProps = Partial<PaperProps>;
/*
{
  elevation?: number;
  square?: boolean;
  stack?: React.ReactNode;
  component?: React.ElementType<any>;
  variant?: 'elevation' | 'outlined';
}*/

type NonNullableProperties<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type WithoutNullableProps = NonNullableProperties<PaperProps>;

type OnlySome = Pick<PaperProps, 'elevation' | 'variant'>;
/*
{
  elevation?: number,
  variant: 'elevation' | 'outlined';
}
*/

type RemoveSome = Omit<PaperProps, 'elevation' | 'variant'>;
/*
 {
  square?: boolean;
  stack: React.ReactNode | null;
  component?: React.ElementType<any>;
}
*/

enum NamedColor {
  RED = 'red',
  WHITE = 'white',
  BLUE = 'blue'
}
const colorToPaint: Record<NamedColor, string> = {
  [NamedColor.BLUE]: 'sky blue',
  [NamedColor.WHITE]: 'pearl white',
  [NamedColor.RED]: 'ruby red'
};

type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

type OptionalProperties = OptionalPropertyOf<PaperProps>; //  "elevation" | "square" | "component"

type ObjectableProps<T extends object> = {
  [K in keyof T]: Extract<T[K], object>;
};

type ObjectProps = ObjectableProps<PaperProps>;

const getResponse = async <T extends object>(response: Promise<T>) => {
  try {
    return await response;
  } catch (e) {
    if (e && e.status && e.status < 500) {
      return { data: null, error: e };
    }
    throw e;
  }
};

type GetResponseType = ReturnType<typeof getResponse>; // Promise<object | {data: null, error: any}>
type GetResponseParameters = Parameters<typeof getResponse>; // [Promise<object>]

export {};
