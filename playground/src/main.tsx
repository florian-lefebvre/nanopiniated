import { render } from "preact";
import { App } from "./app.tsx";
import "./index.css";
import { createStore } from "nanopiniated";

const store = createStore<{}, {}>({})((api) => ({}));

render(<App />, document.getElementById("app")!);
