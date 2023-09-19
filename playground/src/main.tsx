import { render } from "preact";
import { App } from "./app.tsx";
import "./index.css";
import { add } from "nanopiniated";

console.log(add(1, 2) === 3);

render(<App />, document.getElementById("app")!);
