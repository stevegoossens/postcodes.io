# postcodes.io-client
Client for the postcodes.io API (ideal-postcodes/postcodes.io)

TODO: add all code examples and "snazz"

```typescript
import PostcodesIO from 'postcodes.io-client'

const postcodesIO = new PostcodesIO()

const placesData = await postcodesIO.randomPlace()
```

## Install from NPM repo

```
yarn add postcodes.io-client
```

## Development

To develop this package, clone/fork this repo.

### Install

Download all NPM dependencies

```
yarn
```

### Generate code from OpenAPI

Generate TypeScript code from OpenAPI spec (of api.postcodes.io)

```
yarn generate
```

### Build

Transpile to `dist/`

```
yarn build
```