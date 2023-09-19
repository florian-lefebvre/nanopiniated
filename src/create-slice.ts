import type { ApiFunction, ApiFunctionParam } from "./types";

/**
 * Creates a typed store slice creator. Used by `configureHelpers` internally.
 * 
 * Example:
 * ```ts
 * type State = {};
 * type Extra = {};
 * 
 * const createSlice = createSliceWithTypes<State, Extra>();
 * ```
 */
export const createSliceWithTypes = <
  TState extends Record<string, any>,
  TExtra
>() => {
  return <
      TSlice extends Record<string, any>,
      TApiFunction extends ApiFunction<TState, TExtra, TSlice> = ApiFunction<
        TState,
        TExtra,
        TSlice
      >
    >(
      apiFunction: TApiFunction
    ) =>
    (api: ApiFunctionParam<TApiFunction>) =>
      apiFunction(api);
};
