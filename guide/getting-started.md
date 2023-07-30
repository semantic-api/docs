# Getting started

## Instalation

### Prerequisites

- [Node.js](https://nodejs.org) version 19 or higher.
- Terminal to install dependencies and run development environment.
- Text editor with TypeScript syntax support.
    - NeoVim is recommended.
- Anything suitable as a REST client, for example [Postman](https://www.postman.com/), [curl](https://curl.se/) and [mitmproxy](https://mitmproxy.org/).
- A POSIX-compatible environment is recommended.

::: code-group

```sh [npm]
$ npm i @semantic-api/api @semantic-api/server
$ npm i -D semantic-mangler
```

```sh [pnpm]
$ pnpm add @semantic-api/api @semantic-api/server
$ pnpm add -D semantic-mangler
```

```sh [yarn]
$ yarn add @semantic-api/api @semantic-api/server
$ yarn add -D semantic-mangler
```

:::

### Setup helper

Semantic API ships with a command line setup wizard that will automatically scaffold a basic project. On an empty directory named after your project run:

::: code-group

```sh [npm]
$ npm create semantic-api
```

:::

##  Folder structure

Installing the `@semantic-api/api` package will place a type declaration file named `semantic-api.d.ts` in your project root folder. This file is important to make types work and shouldn't be deleted or included in `.gitignore`. The following folder structure is suggested, but not mandatory. Any arrange will work given that the entrypoint is structured correctly.

```
├── src
│   ├── algorithms
│   │   ├── example
│   │   │   ├── doSomeProcessing.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── collections
│   │   ├── pet
│   │   │   ├── description.ts
│   │   │   ├── get.ts
│   │   │   ├── index.ts
│   │   │   ├── insert.ts
│   │   │   ├── model.ts
│   │   │   └── remove.ts
│   │   └── index.ts
│   ├── infrastructure
│   │   ├── accessControl.ts
│   │   └── apiConfig.ts
│   └── index.ts
├── package.json
├── semantic-api.d.ts
└── tsconfig.json
```

::: tip
Braun, the icon library that ships with [Savitri](https://savitriframework.github.io/docs/) dynamically imports the path `./collections` during the runtime, so if you're using Savitri or Braun you must create a `./collections/index.ts` or `./collections.ts` file and export your collections from there.
:::

- `collections/` and `algorithms/`: resources
- `infrastructure/accessControl.ts`: export an [`AccessControl`](/access-control/#accesscontrol) object.
- `infrastructure/apiConfig.ts`: export an [`ApiConfig`]() object.
- `index.ts`: entrypoint file

## The entrypoint file

The entrypoint file (`src/index.ts`) is where you export your API assets and set up a listening web server. You should also put `dist/main.js` in your `main` property of `package.json`.

```typescript
import { initWithDatabaseThenStart } from '@semantic-api/server'

import { apiConfig } from './infrastructure/apiConfig'
export { accessControl } from './infrastructure/accessControl'

export * as collections from './collections'
export * as algorithms from './algorithms'

initWithDatabaseThenStart(apiConfig)
```

## Up and running

If you have scaffolded your project using `npm create semantic-api` then the following scripts must be present in your `package.json`. Otherwise you shoud create them.

```json
{
  "scripts": {
    "build": "semantic-mangler -m build",
    "compile": "semantic-mangler -m compile",
    "compile:run": "npm run compile && (cd dist; cp ../.env .; node --preserve-symlinks index.js)",
    "serve": "nodemon --ext ts --ignore 'dist/**/*' --exec \"npm run compile:run\"",
    "start": "node ./release/index.js"
  }
}
```

The `serve` script will start listening in the 3000 and watch for changes in `./src`. You can learn more about the `semantic-mangler` CLI tool in the [semantic-mangler Reference]().

::: code-group

```sh [npm]
$ npm run serve
```

```sh [pnpm]
$ pnpm run serve
```

```sh [yarn]
$ yarn serve
```

:::

The dev server should be running at `http://localhost:3000`. Make requests with a REST client or integrate directly with [Savitri]() to see your new API in action.

## What's next?
