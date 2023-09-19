/**
 * Creates a typed selector creator. Used by `configureHelpers` internally.
 * 
 * Example:
 * ```ts
 * type State = {};
 * 
 * const createSelector = createSelectorWithTypes<State>();
 * ```
 */
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