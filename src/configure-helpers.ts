import { createActionWithTypes } from "./create-action";
import { createSelectorWithTypes } from "./create-selector";
import { createSliceWithTypes } from "./create-slice";
import { createUseSelectorWithTypes } from "./create-use-selector";
import type { UseStore } from "./types";

export const configureHelpers = <TState extends Record<string, any>, TExtra>({
  useStore,
}: {
  useStore: UseStore<TState>;
}) => {
  return {
    createSlice: createSliceWithTypes<TState, TExtra>(),
    createSelector: createSelectorWithTypes<TState>(),
    createUseSelector: createUseSelectorWithTypes<TState>(useStore),
    createAction: createActionWithTypes<TState, TExtra>(),
  };
};
