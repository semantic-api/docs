# Collection

A collection is a type of resource that holds a [`Description`](/api/description) and can also have a [`model`]() for database access.

<<< @/node_modules/@semantic-api/api/src/types/config.ts#Collection{1}

## Declaring a collection

Collections are declared through a function that returns a `CollectionStructure` object. You may provide an async function. For example:

```typescript
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

If the collection doesn't have the `model` property set, it'll be automatically created with [`createModel`](/api/#create-model) during the runtime. This is done during the warmup phase and the `createModel` function is called just once. If at some point you need to access the model layer you can set this property.

## Extending system collections

There are situations you need to modify system collections. A common one is when you have to add properties to the `user` collection. You may overwrite existing collections by simply exporting them in the entrypoint like a normal collection. Please note that, if you are removing properties from a system collection, some features will probably break.

The following is an example how you extend the `user` collection:

User resources are preferred over system resources...

```typescript
import type { Schema, Context } from '@semantic-api/api'
import user from '@semantic-api/system/collections/user/index.js'

export default async () => {
  const userCollection = await user()
  const newDescription = <const>{
    indexes: [
      'favorite_color'
    ],
    properties: {
      favorite_color: {
        enum: [
          'blue',
          'red',
          'yellow'
        ]
      },
    }
  }

  const description = userCollection.description as typeof userCollection['description'] & typeof newDescription
  Object.assign(description, newDescription)

  return {
    item: {} as Schema<typeof description>,
    description,
    model: userCollection.model,
    functions: {
      ...userCollection.functions,
      async test(_props: null, context: Context<typeof description, any, any>) {
        const randnum = Math.random().toString().slice(2)
        const colors = description.properties.favorite_color.enum

        await context.model.create({
          full_name: `User #${randnum}`,
          email: `${randnum}@mail.com`,
          favorite_color: colors[Math.floor(Math.random()*colors.length)],
          banana: 1
        })

        return context.collection.functions.getAll({}, context)
      }
    }
  }
}
```
