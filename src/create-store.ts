import { produce } from "immer";
import { atom } from "nanostores";
import { type Action } from "./create-action";
import type { ApiFunction, ApiFunctionParam } from "./types";

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
