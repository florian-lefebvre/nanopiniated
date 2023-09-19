# nanopiniated

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]

An opiniated wrapper for nanostores, clean architecure friendly

## Why?

As I started applying [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) principles, I wasn't satisfied by the current state management solutions:

- Redux feels bloated and overkill
- Zustand doesn't have actions listeners
- Pinia is only made for Vue
- Nanostores is unopiniated and has untyped actions listeners

From this observation, I thought it would be cool to write a wrapper around nanostores for this usecase. It features:

- Actions with event listeners, like Redux's `createAsyncThunk`
- Slicing like Zustand
- Selectors
- It's framework-agnostic!

## Usage

Install package:

```sh
# npm
npm install nanopiniated nanostores immer @nanostores/<framework>

# yarn
yarn add nanopiniated nanostores immer @nanostores/<framework>

# pnpm
pnpm install nanopiniated nanostores immer @nanostores/<framework>
```

Import:

```js
// ESM
import { createStore, configureHelpers } from "nanopiniated";

// CommonJS
const { createStore, configureHelpers } = require("nanopiniated");
```

## Usage

Create a store:

```ts
// lib/store.ts

import { mealsSlice, type MealsSlice } from "./meals";
import { createUseSelector } from "./store-utils";
import { createStore } from "nanopiniated";

export type AppState = {
  meals: MealsSlice;
};

export type Extra = {
  getNow(): string;
};

export const store = createStore<AppState, Extra>({
  getNow: () => new Dat().toISOString(),
})((api) => ({
  meals: mealsSlice(api),
  analytics: analyticsSlice(api),
}));

export const useSelector = createUseSelector(store.$store);

export const { useAction } = store;

export const useAppStore = () => useSelector((state) => state);
```

Create helpers:

```ts
// lib/store-utils.ts

import { useStore } from "@nanostores/preact"; // Or switch with another nanostore integration
import type { AppState, Extra } from "./store";
import { configureHelpers } from "nanopiniated";

export const { createAction, createSelector, createSlice, createUseSelector } =
  configureHelpers<AppState, Extra>({ useStore });
```

Create a slice:

```ts
// lib/meals.ts

import { createSlice, createSelector, createAction } from "./store-utils";
import { useSelector } from "./store";

type Meal = {
  id: string;
};

export type MealsSlice = {
  meals: Meal[];
};

export const mealsSlice = createSlice<MealsSlice>((api) => {
  addMealAction.onPending(({ args }) => {
    console.log(`Pending adding meal #${args[0].id}`);
  });

  return {
    meals: [],
  };
});

export const addMealAction = createAction(({ set }, meal: Meal) => {
  set((state) => state.meals.meals.push(meal));

  return meal;
});

const mealsSelector = createSelector((state) => state.meals.meals);

const mealSelector = createSelector((state, id: Meal["id"]) =>
  state.meals.meals.find((m) => m.id === id)
);

export const useMeals = () => useSelector(mealsSelector());

export const useMeal = (...args: Parameters<typeof mealSelector>) =>
  useSelector(mealSelector(...args));
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run `pnpm build:watch`
- Test changes in `./playground`

## License

Made with ❤️ by [Florian Lefebvre](https://github.com/florian-lefebvre).

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nanopiniated?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/nanopiniated
[npm-downloads-src]: https://img.shields.io/npm/dm/nanopiniated?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/nanopiniated
[bundle-src]: https://img.shields.io/bundlephobia/minzip/nanopiniated?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=nanopiniated
