# `@semantic-api/api`

## Types

- [`Description`](/api/description)
- [`Algorithm`](/api/algorithm)
- [`Collection`](/api/collection)
- [`Context`](/api/context)
- [`ContextOptions`](/api/context-options)

## Global API

- [`createModel`]()
- [`createContext`]()
- [`defineAliasDescription`]()
- [`defineDescription`]()
- [`useFunctions`]()

## Advanced API

You shouldn't be using these unless you really know what you're doing.

- [`connectToDatabase`]()
- [`getAccessControl`]()
- [`getResources`]()
- [`getResourceAsset`]()
- [`getFunction`]()

## Description

Please head to [`Description`](/api/description).

## Algorithm

Please head to [`Algorithm`](/api/algorithm).

## Collection

Please head to [`Collection`](/api/collection).

## Context

A context is an object that is passed down to the endpoint functions. It contains shorthands for acessing the Model (if the resource is a collection), description, session Token, strongely typed references to another collections and algorithms, and more. To create a context use the helper [`createContext`](#create-context).

<<< @/node_modules/@semantic-api/api/src/context.ts#Context{1}

It also provides the following shorthand functions:

- `log`

Used to log an entry to the database with the system collection `Log`.
For detailed usage head to [`Logging`](/guide/logging) section.

```ts
declare const log: (message: string, details?: any) => Promise<Log>
```

- `validate`

Validates an object against a JSON Schema.
For detailed usage head to [`Validation`](/guide/validation) section.

```ts
declare const validate: <T>(
    description: Omit<Description, '$id'>,
    what: T,
    required?: (keyof T)[] | null | undefined
) => ReturnType<typeof import('@semantic-api/api').validateFromDescription>
```

- `limitRate`

Validates an object against a JSON Schema.
For detailed usage head to [`Rate limiting`](/guide/rate-limiting) section.

```ts
declare const limitRate: (params: RateLimitingParams) =>
    ReturnType<typeof import('@semantic-api/api').limitRate>
```

## ContextOptions

Options object used to create a Context.

<<< @/node_modules/@semantic-api/api/src/context.ts#ContextOptions{1}

## createContext

Creates a context given its options.

- `apiConfig`: set by the server
- `parentContext`: if you are creating the context manually from another function that already has it's context, then you may set this prop to merge the old context into the new one
- `resourceType`: defaults to `collection`
- `resourceName`: the collection/algorithm name, used to resolve it's dependencies

```ts
declare const createContext: <
  TDescription extends Description,
  TCollections extends Collections,
  TAlgorithms extends Algorithms
>(options?: ContextOptions<TCollections, TAlgorithms>) => Promise<Context<TDescription, TCollections, TAlgorithms>>
```
