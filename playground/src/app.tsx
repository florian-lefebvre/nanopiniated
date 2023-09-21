import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import {
  reportAction,
  useAction,
  useAppStore,
  useCount,
  useOtherCount,
} from "./lib/store";

export function App() {
  const [count, setCount] = useState(0);
  const report = useAction(reportAction);
  const analytics = useAppStore((state) => state.analytics);
  const areCountsEqual = useCount(count);
  const otherCount = useOtherCount();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
            report("COUNT", "+1");
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
        <pre style={{ width: "100%", textAlign: "left" }}>
          {JSON.stringify({ analytics, areCountsEqual, otherCount }, null, 2)}
        </pre>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  );
}
