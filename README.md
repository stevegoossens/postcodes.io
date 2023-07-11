# postcodes.io-client
Client for the postcodes.io API

:octocat: [ideal-postcodes/postcodes.io](https://github.com/ideal-postcodes/postcodes.io)
REST API docs: https://api.postcodes.io/

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

### View api.postcodes.io REST API docs

You can view a complete documentation of the api.postcodes.io REST API, rendered with ReDoc, locally in a browser.

```
yarn docs
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