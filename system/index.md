# `@semantic-api/system`

The `@semantic-api/system` package is intended to host algorithms and collections that are essential for the running of a basic API. Those are referred to as system algorithms/collections. They are:

## Collections

You can import the types of the below collections from the package root. Example:

```ts
import type { User } from '@semantic-api/system'
```

### `apiKey`

Used for third-party authentication.

### `file`

Used for file storage.

### `user`

Used for authentication.

### `log`

Used for logging entries in the database.

### `resourceUsage`

Used for rate limiting and managing paid resources.

## Algorithms

### `meta`

Contains functions required to bootstrap the API.
