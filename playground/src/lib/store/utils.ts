import type { TState, AppExtra } from ".";
import { configureHelpers } from "nanopiniated";

export const { createAction, createSelector, createSlice } = configureHelpers<
  TState,
  AppExtra
>();
