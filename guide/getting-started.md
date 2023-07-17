# Getting started

Unlike traditional libraries, some of the configuration of a Semantic API instance isn't passed down to the application through a function parameter. Instead, they're made available to the runtime through exports in the entrypoint file. This goes for [`collections`](), [`algorithms`]() and [`accessControl`]().

To make the web server start listening, run `initWithDatabase` from `@semantic-api/server`. This function will return a Promise that resolves a `Hapi.Server` object. This could be used later to add routes and perform another kinds of web server configuration. You could for example setup a Hapi plugin as needed.

For more resources on server configuration visit [@semantic-api/server]().

```ts
import { defineAccessControl } from '@semantic-api/access-control'
import { initWithDatabase } from '@semantic-api/server'

import exampleCollection from './collections/exampleCollection'
import exampleAlgorithm from './collections/exampleAlgorithm'

export const collections = {
  exampleCollection
}

export const algorithms = {
  exampleAlgorithm
}

export const accessControl = defineAccessControl<Collections, Algorithms>()({
  guest: {
    inherit: [
      'unauthenticated'
    ]
  }
})()

initWithDatabase().then(async (server) => {
  server.start()
})
```
