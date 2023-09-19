import type { WritableAtom } from "nanostores";
import type { UseStore } from "./types";

/**
 * Creates a typed `useSelector` function. Used by `configureHelpers` internally.
 *
 * Requires a `useStore` function, provided by one of
 * [nanostores integrations](https://github.com/nanostores/nanostores#integration).
 * 
 * Example:
 * ```ts
 * import { useStore } from "@nanostores/preact";
 * 
 * type State = {};
 * type Extra = {};
 *
 * const useSelector = createUseSelectorWithTypes<State, Extra>(useStore);
 * ```
 */
export const createUseSelectorWithTypes =
  <TState extends Record<string, any>>(useStore: UseStore<TState>) =>
  (store: WritableAtom<TState>) =>
  <TReturn>(fn: (state: TState) => TReturn) =>
    fn(useStore(store));
