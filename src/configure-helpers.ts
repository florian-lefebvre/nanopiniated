import { createActionWithTypes } from "./create-action";
import { createSelectorWithTypes } from "./create-selector";
import { createSliceWithTypes } from "./create-slice";
import { createUseSelectorWithTypes } from "./create-use-selector";
import type { UseStore } from "./types";

/** 
 * Creates typed helpers. Uses `createSliceWithTypes`, `createSelectorWithTypes`,
 * `createUseSelectorWithTypes` and `createActionWithTypes` internally.
 * 
 * Requires a `useStore` function, provided by one of
 * [nanostores integrations](https://github.com/nanostores/nanostores#integration).
 * 
 * Example:
 * ```ts
 * import { useStore } from "@nanostores/preact";
 * 
 * type State = {};
 * type Extra = {};
 * 
 * export const {
 *    createAction,
 *    createSelector,
 *    createSlice,
 *    createUseSelector,
 * } = configureHelpers<State, Extra>({ useStore });
 * ```
 */
export const configureHelpers = <TState extends Record<string, any>, TExtra>({
  useStore,
}: {
  useStore: UseStore<TState>;
}) => {
  return {
    /**
     * Creates a store slice. Has access to the whole store api.
     * Use the initializer function to register actions listeners and
     * Used by `configureHelpers` internally.
     *
     * Example:
     * ```ts
     * export type MealsSlice = {
     *    meals: Meal[];
     * };
     *
     * export const mealsSlice = createSlice<MealsSlice>((api) => {
     *
     *    addMealAction.onPending(() => { ... });
     *
     *    return {
     *        meals: [],
     *    };
     * });
     * ```
     */
    createSlice: createSliceWithTypes<TState, TExtra>(),
    /**
     * Allows creating selectors to hide querying logic.
     * Works well with `useSelector`.
     *
     * Example:
     * ```ts
     * const mealsSelector = createSelector((state) => state.meals.meals);
     *
     * const mealSelector = createSelector((state, id: Meal["id"]) => state.meals.meals.find((m) => m.id === id));
     * ```
     */
    createSelector: createSelectorWithTypes<TState>(),
    /**
     * Allows reactive usage of selectors.
     *
     * Example:
     * ```ts
     * const meals = useSelector(mealsSelector());
     * ```
     *
     * Wrap it in a hook to improve DX.
     *
     * Example:
     * ```ts
     * const useMeals = () => useSelector(mealsSelector());
     * const useMeal = (...args: Parameters<typeof mealSelector>) => useSelector(mealSelector(...args));
     * ```
     */
    createUseSelector: createUseSelectorWithTypes<TState>(useStore),
    /**
     * Allows encapsulating business logic while having access
     * to the store's API. Ideal for state mutations (using `set`,
     * powered by immer).
     *
     * Offers access to listeners that can be registered anywhere.
     * However, it's recommended to do it in `createSlice` initializer
     * function.
     *
     * Example:
     * ```ts
     * export const addMealAction = createAction(({ set }, meal: Meal) => {
     *    set((state) => state.meals.meals.push(meal));
     *    return meal;
     * });
     *
     *
     * const mealsSlice = createSlice((api) => {
     *
     *    addMealAction.onPending(() => { ... });
     *
     *    return { ... };
     * });
     * ```
     */
    createAction: createActionWithTypes<TState, TExtra>(),
  };
};
