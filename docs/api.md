## JavaScript API

```js
const poi = require('poi')

const app = poi({
  entry: './src/my-entry.js'
})
```

## API

### poi(options)

#### options

It is the same as the config in config file, with following addtional options:

##### mode

Type: `string`<br>
Default: `undefined`<br>
Value: `oneOf(['development', 'production', 'watch', 'test'])`

### app.prepare()

Return: `Promise`

Poi would load presets, babel/postcss config files here.

This is automatically called in `app.build()` `app.dev()` `app.watch()`

### app.createWebpackConfig()

Return: `WebpackConfig`

It returns a webpack config object, this might be different from the actual webpack config we use if you didn't call `app.prepare()` before this. But it's enough to use with `eslint-plugin-import-resolver-webpack`.

### app.build()

Return: `Promise` which resolves to [stats](https://webpack.js.org/api/node/#stats-object).

Build app in production mode

### app.watch()

Return: `Promise` which resolves to webpack watcher instance.

Build app and watch files changes.

### app.dev()

Return: `Promise` which resolves to `{ server, host, port }`

Build app and start dev server.
