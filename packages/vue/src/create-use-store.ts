import type { WritableAtom } from "nanostores";
import { shallow } from "shared/src/shallow";
import {
  getCurrentScope,
  onScopeDispose,
  readonly,
  shallowRef,
  type DeepReadonly,
  type Ref,
} from "vue";

// Inspired from @nanostores/vue `useStore` implementation
const useSyncExternalStoreWithSelector = <Snapshot, Selection>(
  subscribe: (fn: () => void) => () => void,
  getSnapshot: () => Snapshot,
  selector: (snapshot: Snapshot) => Selection,
  isEqual: (a: Selection, b: Selection) => boolean = (a, b) => a === b
): DeepReadonly<Ref<Selection>> => {
  const state = shallowRef<Selection>(selector(getSnapshot()));

  const unsubsribe = subscribe(() => {
    const newState = selector(getSnapshot());

    if (!isEqual(newState, state.value)) {
      state.value = newState;
    }
  });

  getCurrentScope() && onScopeDispose(unsubsribe);

  return readonly(state);
};

export const createUseStore =
  <TState extends Record<string, any>>($store: WritableAtom<TState>) =>
  <TReturn = TState>(selector?: (state: TState) => TReturn) => {
    const { subscribe, get } = $store;
    return useSyncExternalStoreWithSelector<TState, TReturn>(
      subscribe,
      get,
      selector || ((state) => state as any),
      selector ? shallow : undefined
    );
  };