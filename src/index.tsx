import * as React from "react";
import { render } from "react-dom";
import * as ex1 from "./1_basic_types/";
import App from "./App";

console.log(ex1);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
