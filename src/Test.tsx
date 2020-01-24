import * as React from "react";

interface Props {
  name: string;
}

export const Test: React.FunctionComponent<Props> = ({ name }) => (
  <div>{name}</div>
);
