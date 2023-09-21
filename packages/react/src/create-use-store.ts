import type { WritableAtom } from "nanostores";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { shallow } from "shared/src/shallow"

export const createUseStore =
  <TState extends Record<string, any>>($store: WritableAtom<TState>) =>
  <TReturn = TState>(selector?: (state: TState) => TReturn) => {
    const { subscribe, get } = $store;
    return useSyncExternalStoreWithSelector<TState, TReturn>(
      subscribe,
      get,
      get,
      selector || ((state) => state as any),
      selector ? shallow : undefined
    );
  };