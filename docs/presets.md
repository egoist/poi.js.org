# Presets

Check out all available presets: https://github.com/egoist/poi/tree/master/packages

## Use a preset

You can use preset with or without options:

```js
// poi.config.js
module.exports = {
  presets: [
    require('poi-preset-name')(options)
  ]
}
```

If you're using `package.json` as config file, you can:

```js
{
  "poi": {
    "presets": [
      "foo", // use poi-preset-foo, without options
      ["bar", {}], // use poi-preset-bar, with options
      "./my-preset.js" // local file
    ]
  }
}
```

## Create a preset

Bascially a preset exports a higher-order function:

```js
// my-preset.js
module.exports = options => {
  return poi => {
    // your code
  }
}
```

### poi.extendWebpack(mode, handler)

Add a handler to manipulate webpack-chain instance in specific modes.

#### mode

Type: `string` `Array`<br>
Optional: `true`

Possible values: `development` `production` `watch` `test` `*`

#### handler

Type: `function`<br>
Required: `true`

A handler function which you can use to manipulate webpack-chain instance, eg:

```js
poi.extendWebpack('production', config => {
  // Remove progress bar in production mode
  config.plugins.delete('progress-bar')
})
```

### poi.manifest

The data of `package.json` in user's project.

### poi.options

Same as the `options` in `poi.config.js`, it's the result of CLI options merged with config file, and CLI options takes higher priority.

### poi.merge

Bascially `lodash.merge`

### poi.argv

Parsed CLI arguments.

### poi.run

You can run middlewares in Poi commands, like adding a middleware to run some test runner in `poi test`:

```js
poi.run('test', webpackConfig => {
  // The `webpackConfig` is the actual webpack config object
  // Not the webpack-chain instance
  // This function will be invokes as the last step in the command
  doSomething()
})
```

This middleware function could be sync or return a Promise.

