import { useAppStore } from "..";
import { createSelector, createSlice } from "../utils";

export type AnalyticsSlice = {
  distinctID: string;
  count: number;
};

export const DEFAULT_ANALYTICS_SLICE_STATE: AnalyticsSlice = {
  distinctID: "",
  count: 0,
};

export const analyticsSlice = createSlice<AnalyticsSlice>((api) => {
  const count = countSelector()(api.get());
  console.log(count)

  return DEFAULT_ANALYTICS_SLICE_STATE;
});

const countSelector = createSelector((state) => state.analytics.count);

export const useOtherCount = () => useAppStore(countSelector());

export const useCount = (count: number) =>
  useAppStore((state) => state.analytics.count === count);
