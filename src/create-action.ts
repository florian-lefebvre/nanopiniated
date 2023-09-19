import type { ApiFunction, ApiFunctionParam } from "./types";

class _Bus<TArgs extends any[], TReturn> extends EventTarget {
  pending(detail: { args: TArgs }) {
    this.dispatchEvent(new CustomEvent("pending", { detail }));
  }

  rejected(detail: { args: TArgs; error: unknown }) {
    this.dispatchEvent(new CustomEvent("rejected", { detail }));
  }

  fullfilled(detail: { args: TArgs; result: TReturn }) {
    this.dispatchEvent(new CustomEvent("fullfilled", { detail }));
  }
}

type _ActionHandler<
  TState extends Record<string, any>,
  TExtra,
  TApi extends ApiFunctionParam<ApiFunction<TState, TExtra>>,
  TArgs extends any[],
  TReturn
> = (api: TApi) => (...args: TArgs) => TReturn;

const _createAction = <
  TState extends Record<string, any>,
  TExtra,
  TApi extends ApiFunctionParam<ApiFunction<TState, TExtra>>,
  TArgs extends any[],
  TReturn,
  TBus extends _Bus<any, any> = _Bus<any, any>
>(
  handler: _ActionHandler<TState, TExtra, TApi, TArgs, TReturn>,
  bus: TBus
) => ({
  onPending: (listener: TBus["pending"]) => {
    bus.addEventListener("pending", (e) => listener((e as any).detail));
  },
  onRejected: (listener: TBus["rejected"]) => {
    bus.addEventListener("rejected", (e) => listener((e as any).detail));
  },
  onFullfilled: (listener: TBus["fullfilled"]) => {
    bus.addEventListener("fullfilled", (e) => listener((e as any).detail));
  },
  handler,
});

export type Action<
  TState extends Record<string, any>,
  TExtra,
  TApi extends ApiFunctionParam<ApiFunction<TState, TExtra>>,
  TArgs extends any[],
  TReturn,
  TBus extends _Bus<any, any> = _Bus<any, any>
> = typeof _createAction<TState, TExtra, TApi, TArgs, TReturn, TBus>;

export const createActionWithTypes =
  <TState extends Record<string, any>, TExtra>() =>
  <
    TApi extends ApiFunctionParam<ApiFunction<TState, TExtra>>,
    TArgs extends any[],
    TReturn
  >(
    fn: (api: TApi, ...args: TArgs) => TReturn
  ) => {
    const bus = new _Bus();

    const handler: _ActionHandler<TState, TExtra, TApi, TArgs, TReturn> =
      (api) =>
      (...args) => {
        const allArgs = [api, ...args] as const;
        bus.pending({ args });

        try {
          const result = fn(...allArgs);

          bus.fullfilled({ args, result });

          return result;
        } catch (error) {
          bus.rejected({ args, error });
          throw error;
        }
      };

    return _createAction(handler, bus);
  };
