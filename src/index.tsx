import * as React from "react";
import { render } from "react-dom";
import * as ex1 from "./1_basic_types/index";
import * as ex2 from "./2_interfaces/index";
import * as ex3 from "./3_generics/index";
import * as ex4 from "./4_type_guards/index";
import * as ex5 from "./5_conditional_types/index";
import * as ex6 from "./6_helper_type_creators/index";
import App from "./App";

console.log(ex1, ex2, ex3, ex4, ex5, ex6);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
