# Presets

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
      ["bar", {}] // use poi-preset-bar, with options
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

### poi.command

Type: `function`

Run actions in specified command:

```js
poi.command('dev', () => {
  console.log('This is in "poi dev" command')
})

poi.command(['build', 'watch'], () => {
  console.log('This is in default and "watch" command')
})
```

If the command action is asynchonous, it should return a Promise.

### poi.webpackConfig

This is a [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) instance, you can use it to modify webpack config.

### poi.manifest

The data of `package.json` in user's project.

### poi.options

Same as the `options` in `poi.config.js`, it's the result of CLI options merged with config file, and CLI options takes higher priority.

