import type { WritableAtom } from "nanostores";

export type ApiFunction<
  TState extends Record<string, any>,
  TExtra,
  TResult = TState
> = (api: {
  get: () => TState;
  set: (setFunction: (state: TState) => void) => void;
  extra: TExtra;
  $store: WritableAtom<TState>;
}) => TResult;

export type ApiFunctionParam<TApiFunction extends ApiFunction<any, any>> =
  Parameters<TApiFunction>[0];

export type UseStore<TState> = (store: WritableAtom<TState>) => TState;
