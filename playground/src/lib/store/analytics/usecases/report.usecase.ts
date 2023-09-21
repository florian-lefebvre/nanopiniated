import { createAction } from "../../utils";

export const reportAction = createAction(({ set }, key: string, data: any) => {
  console.log(`[${key}] ${data}`);
  set((state) => state.analytics.count++);
});
