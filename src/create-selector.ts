export const createSelectorWithTypes = <
  TState extends Record<string, any>
>() => {
  return <TArgs extends any[], TResult>(
      selector: (state: TState, ...args: TArgs) => TResult
    ) =>
    (...args: TArgs) =>
    (state: TState) =>
      selector(state, ...args);
};