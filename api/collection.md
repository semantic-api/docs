# Collection

A collection is a type of resource that holds a [`Description`](/api/description) and can also have a [`model`]() for database access.

<<< @/node_modules/@semantic-api/api/src/types/config.ts#Collection{1}

## Declaring a collection

Collections are declared through a function that returns a `CollectionStructure` object. You may provide an async function. For example:

```ts
import { defineDescription } from '@semantic-api/api'

const [Pet, description] = defineDescription({
  $id: 'pet',
  properties: {
    name: {
      type: 'string'
    },
    favorite_toy: {
      enum: [
        'bone',
        'duck',
        'ball'
      ]
    }
  }
})

export default () => ({
  item: Pet,
  description
})
```

The above snippet will declare a valid collection whose model can be later used to access the database. To make it work simply import it in your application's entrypoint and then export it inside `collections`.

## Fallbacks

If the collection hasn't the `model` property set, it'll be automatically created with [`createModel`](/api/#create-model) during the runtime. This is done during the warmup phase and the `createModel` function is called just once. If at some point you need to access the model layer you can set this property.
