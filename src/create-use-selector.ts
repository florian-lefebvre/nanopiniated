import type { WritableAtom } from "nanostores";
import type { UseStore } from "./types";

export const createUseSelectorWithTypes =
  <TState extends Record<string, any>>(useStore: UseStore<TState>) =>
  (store: WritableAtom<TState>) =>
  <TReturn>(fn: (state: TState) => TReturn) =>
    fn(useStore(store));
