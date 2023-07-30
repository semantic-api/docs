# `@semantic-api/access-control`

## Types

- [`Role`](#role)
- [`AccessControl`](#access-control)
- [`AccessControlLayer`](#access-control-layer)
- [`ValidAccessControlLayer`](#valid-access-control-layer)

## Global API

- [`defineAccessControl`](#define-access-control)


## Role

<<< @/node_modules/@semantic-api/access-control/src/types.ts#Role{1}

## AccessControl

<<< @/node_modules/@semantic-api/access-control/src/types.ts#AccessControl{1}

## AccessControlLayer

<<< @/node_modules/@semantic-api/access-control/src/layers/types.ts#AccessControlLayer{1}

## ValidAccessControlLayer

<<< @/node_modules/@semantic-api/access-control/src/types.ts#ValidAccessControlLayer{1}

## defineAccessControl

Defines a `AccessControl` object while providing strong typing.

<<< @/node_modules/@semantic-api/access-control/src/define.ts#defineAccessControl{1}

### Example

```typescript
import { defineAccessControl } from '@semantic-api/access-control'

export const accessControl = defineAccessControl<Collections, Algorithms>()({
  roles: {
    guest: {
      inherit: [
        'unauthenticated',
        // will produce TS diagnostics since there's no 'non_existent' role to inherit
        // 'non_existent'
      ],
      capabilities: {
        someResource: {
          grantEverything: true
        }
      }
    }
  }
})({
  read: async (context, { payload }) => {
    // will produce TS diagnostics since 'non_existent' role wasn't provided
    // if( context.token.user.roles.includes('non_existent') ) {
    //   context.log('oh no!')
    // }
  }
})
```
