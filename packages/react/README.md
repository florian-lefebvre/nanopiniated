# @nanopiniated/react

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]

React integration for [nanopiniated](https://github.com/florian-lefebvre/nanopiniated).

## Getting started

Install package:

```sh
# npm
npm install @nanopiniated/react

# yarn
yarn add @nanopiniated/react

# pnpm
pnpm install @nanopiniated/react
```

Import:

```js
// ESM
import { createUseStore } from "@nanopiniated/react";

// CommonJS
const { createUseStore } = require("@nanopiniated/react");
```

## Usage

```ts
import { createStore } from "nanopiniated"
import { createUseStore } from "@nanopiniated/react"

export const store = createStore(...)

export const useAppStore = createUseStore(store.$store)
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

Published under [MIT License](../../LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nanopiniated/react?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@nanopiniated/react
[npm-downloads-src]: https://img.shields.io/npm/dm/@nanopiniated/react?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@nanopiniated/react
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@nanopiniated/react?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@nanopiniated/react
