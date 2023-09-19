import { produce } from "immer";
import { atom } from "nanostores";
import { type Action } from "./create-action";
import type { ApiFunction, ApiFunctionParam } from "./types";

/**
 * Creates a typed store that suppports dependencies injection
 * and only contains state.
 *
 * Returns
 * - `getState`
 * - `useAction` that you can pass an action defined with `createAction`
 * - `setInitialState` that you can use to hydrate for example
 * - Raw `$store` nanostores' atom. Prefer other ways if possible
 * 
 * State can be broken in smaller pieces using `createSlice`.
 *
 * Example:
 * ```ts
 * type State = {
 *    a: number
 *    foo: FooSlice
 * }
 * type Extra = {
 *    getNow(): Date
 * }
 * 
 * const fooSlice = createSlice(...)
 *
 * const store = createStore({
 *    getNow: () => new Date
 * })((api) => ({ a: 0, foo: fooSlice(api) }))
 * ```
 */
export const createStore = <TState extends Record<string, any>, TExtra>(
  extra: TExtra
) => {
  type _ApiFunction = ApiFunction<TState, TExtra>;
  type _ApiFunctionParam = ApiFunctionParam<_ApiFunction>;

  const $store = atom<TState>(undefined as any);

  const get = $store.get;

  const set: _ApiFunctionParam["set"] = (setFunction) => {
    const nextState = produce<TState, TState>($store.get(), (state) => {
      // Do not return it directly, immer considers it invalid.
      // That's why we wrap `setFunction`
      setFunction(state);
    });
    $store.set(nextState);
  };

  const api: _ApiFunctionParam = { get, set, extra, $store };

  return (apiFunction: _ApiFunction) => {
    $store.set(apiFunction(api));

    const useAction = <TArgs extends any[], TResult>(
      action: ReturnType<
        Action<TState, TExtra, _ApiFunctionParam, TArgs, TResult>
      >
    ) => action.handler(api);

    const setInitialState = (newState: Partial<TState>) =>
      $store.set({ ...$store.get(), ...newState });

    return {
      $store,
      getState: get,
      useAction,
      setInitialState,
    };
  };
};
