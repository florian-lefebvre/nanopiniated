import { createStore } from "nanopiniated";
import {
  analyticsSlice,
  DEFAULT_ANALYTICS_SLICE_STATE,
  type AnalyticsSlice,
} from "./analytics";
import { createUseStore } from "@nanopiniated/react";

export * from "./analytics";

export type TState = {
  analytics: AnalyticsSlice;
};

export type AppExtra = {};

export const store = createStore<TState, AppExtra>(
  {},
  {
    analytics: DEFAULT_ANALYTICS_SLICE_STATE,
  }
)((api) => ({
  analytics: analyticsSlice(api),
}));

export const { useAction } = store;

export const useAppStore = createUseStore(store.$store);
