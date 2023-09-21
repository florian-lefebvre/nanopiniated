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

## Getting started

Install package:

```sh
# npm
npm install nanopiniated

# yarn
yarn add nanopiniated

# pnpm
pnpm install nanopiniated
```

You can use one or multiple integrations:

- [@nanopiniated/react](./packages/react/README.md)
- @nanopiniated/vue (Soon)
- Need another one? Open an issue!

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

import {
  mealsSlice,
  type MealsSlice,
  DEFAULT_MEALS_SLICE_STATE,
} from "./meals";
import { createStore } from "nanopiniated";

export type AppState = {
  meals: MealsSlice;
};

export type AppExtra = {
  getNow(): string;
};

export const store = createStore<AppState, AppExtra>(
  {
    getNow: () => new Dat().toISOString(),
  },
  { meals: DEFAULT_MEALS_SLICE_STATE }
)((api) => ({
  meals: mealsSlice(api),
}));

export const { useAction } = store;
```

Create helpers:

```ts
// lib/store-utils.ts

import type { AppState, AppExtra } from "./store";
import { configureHelpers } from "nanopiniated";

export const { createAction, createSelector, createSlice } = configureHelpers<
  AppState,
  AppExtra
>();
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

const DEFAULT_MEALS_SLICE_STATE: MealsSlice = {
  meals: [],
};

export const mealsSlice = createSlice<MealsSlice>((api) => {
  addMealAction.onPending(({ args }) => {
    console.log(`Pending adding meal #${args[0].id}`);
  });

  return DEFAULT_MEALS_SLICE_STATE;
});

export const addMealAction = createAction(({ set }, meal: Meal) => {
  set((state) => state.meals.meals.push(meal));

  return meal;
});
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run `pnpm build:all`
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
