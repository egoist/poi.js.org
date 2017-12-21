<p align="center">
  <img src="https://ooo.0o0.ooo/2017/04/30/5905ba6f1f3ee.png" alt="preview" />
</p>

## Badges

[![NPM version](https://img.shields.io/npm/v/poi.svg?style=flat-square)](https://npmjs.com/package/poi) [![NPM downloads](https://img.shields.io/npm/dm/poi.svg?style=flat-square)](https://npmjs.com/package/poi) [![Build Status](https://img.shields.io/circleci/project/egoist/poi/master.svg?style=flat-square)](https://circleci.com/gh/egoist/poi) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat-square)](https://github.com/egoist/donate)

## Introduction

*Develop web apps with no build configuration until you need.*

Start writing an app with a single `.js` file, Poi could handle all the development setups for you, no more configuration hell.

Install *Poi*:

```bash
# Either globally
yarn global add poi
# Or locally (preferred)
yarn add poi --dev
```

Then populating an `index.js`:

```js
import Vue from 'vue'

new Vue({
  el: '#app',
  render() {
    return <h1>Hello World!</h1>
  }
})
```

> *Note: Poi supports all frameworks but only Vue has built-in support, for other frameworks like React and Svelte etc. please use a [preset](https://github.com/egoist/poi/tree/master/packages) or see how to [configure](#config-file).*

To develop this file, run `poi` in your terminal and you can open `http://localhost:4000` to preview!

So far we get:

- Automatic transpilation and bundling (with webpack and babel/postcss)
- Hot code reloading
- Files in `./static` are copied to dist folder, eg. `static/favicon.ico` to `dist/favicon.ico`

Build app in production mode (optimized and minified):

```bash
poi build
```

To change the path of entry file:

```bash
poi src/my-entry.js # development
poi build src/my-entry.js # production
```

## Modes

There're **four** modes:

- `poi`: Default command, run app in `development` mode
- `poi build`: Build app in `production` mode
- `poi test`: The `test` mode, by default it does nothing, but you can use it with some presets.
- `poi watch`: Run app in webpack's `watch` mode

## Config file

All CLI options and config can be set here:

```js
module.exports = (options, req) => ({
  entry: './src/index.js'
  // Other options
})

// Note that you can directly export an object too:
// module.exports = { port: 5000 }
```

By default the CLI will load `poi.config.js` if it exists. To change the path, you can add `--config [path]` in CLI arguments. 

You can also set `poi` property in `package.json` when you only need JSON for configurations.

### Arguments

#### options

CLI options.

#### req

The `require` function but context directory is the path to `node_modules/poi/lib`, which means you can use it to load poi's dependencies, like `webpack`.

### Babel

JS files and `script` tags in Vue single-file components are transpiled by Babel. We only use one preset by default: [babel-preset-poi](https://github.com/egoist/poi/blob/master/packages/babel-preset-poi/) which supports Vue JSX by default.

It's easy to switch to another JSX transformer with this preset, e.g. set `jsx: 'react'` in config file to use React JSX. 

poi will use `.babelrc` instead if it exists, you can also set `babelrc: false` option in babel config file to disable itself when you don't want to use it, check out [related babel docs](https://babeljs.io/docs/usage/api/#options).

### PostCSS

Standalone `.css` files and `style` tags in single-file components are transpiled by PostCSS, the only plugin we use by default is `autoprefixer`, and you can use `autoprefixer` option in config file to adjust it, here's the config with default value:

```js
module.exports = {
  autoprefixer: {
    browsers: ['ie > 8', 'last 3 versions']
  }
  // to disable autoprefixer
  // autoprefixer: false
}
```

You can use PostCSS config file like `postcss.config.js` or whatever [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config) supports. `postcss` option is also available in config file.

### Custom CSS preprocessors

Supported preprocessors: `sass` `scss` `stylus` `less`, the workflow of CSS is `custom css preprocessor` -> `postcss-loader` -> `css-loader`.

To use a custom CSS preprocessor, you can directly install relevant loader and dependency. For example, to import `.scss` files:

```bash
yarn add node-sass sass-loader --dev
```

### CSS modules

#### Single-file component

To use CSS modules in single-file component, you can set `module` attribute on `<style></style>` tag.

```vue
<template>
  <div :class="$style.foo">hi</div>
</template>

<style module>
  .foo {
    color: red;
  }
</style>
```

#### Standalone CSS files

Files ending with `.module.css` `.module.scss` `.module.less` etc also support CSS modules by default.

To enable CSS modules for all CSS files, set `cssModules: true` in config file.

### Vue

We're using [babel-preset-poi](https://github.com/egoist/poi/tree/master/packages/babel-preset-poi) so you will have built-in support for Vue JSX by default.

Besides this, single-file component (hot reload, preprocessors, css extraction) is fully supported.

### Webpack entry

Type: `string` `Array` `Object`<br>
Default: `index.js`

You can set webpack entry via CLI arguments or `entry` property in config file. If it's an array or string, we add it into `webpackConfig.entry.client` entry, otherwise it will entirely override `webpackConfig.entry`.

### Code splitting

We enabled code splitting for vendor code and app code by default in all modes other than `test` mode (poi test), you can set `vendor` option to `false` to disable it. And by default all required modules in `node_modules` will be split.

To lazy-load components, you can use [dynamic import](https://webpack.js.org/guides/code-splitting-async/#dynamic-import-import-) syntax:

```js
const Home = import('./views/homepage')
// This returns a Promise
```

### Polyfills

By default Poi does not polyfill anything! So you need to import required polyfills, let's include the polyfills we need at `src/polyfills.js` first:

```js
Object.assign = require('object-assign')

if (!window.Promise) {
  window.Promise = require('promise-polyfill')
}
```

Then you can import it at the top of your app entry `src/index.js`:

```js
import './polyfills'

// ...app code
```

### Webpack

You can directly mutate webpack config via `webpack` option:

```js
// poi.config.js
module.exports = {
  webpack(config) {
    config.plugins.push(new MyWebpackPlugin())
    return config // <-- Important, must return it
  }
}
```

Or change webpack config using [webpack-chain](https://github.com/mozilla-rpweb/webpack-chain):

```js
module.exports = {
  extendWebpack(config) {
    // Disable progress bar while building
    config.plugins.delete('progress-bar')
  }
}
```

Using webpack-chain is more verbose but you gain more control with it.

### Custom HTML output

Type: `Object` `Array` `boolean`

[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) options, use this option to customize generated `index.html`, default value:

```js
module.exports = {
  html: {
    // `pkg` is the data from `package.json`
    title: pkg.productName || pkg.name,
    description: pkg.description,
    template: '', // Defaults to $cwd/index.ejs if it exists, otherwise use built-in template
    pkg: {} // All package.json data
  }
}
```

Check out the [built-in template](https://github.com/egoist/poi/blob/master/packages/poi/lib/index.ejs) file we use, the template supports the [lodash.template](https://lodash.com/docs/4.17.4#template) syntax by default. To disable generating html file, you can set `html` to `false`.

The options for html-webpack-plugin are available in template file as `htmlWebpackPlugin.options` and you can use `htmlWebpackPlugin.options.pkg` to access the data of `package.json`.

### Custom output filename

Set custom filename for js, css, static files:

```js
module.exports = {
  filename: {
    js: '[name].[chunkhash:8].js',
    css: 'style.css',
    images: 'assets/images/[name].[ext]',
    fonts: 'assets/fonts/[name].[ext]',
    chunk: '[id].chunk.js'
  }
}
```

### Extracting CSS

The `extractCSS` option is `true` by default in production mode, however you can also set it manually to override:

```js
module.exports = {
  // Always disable extracting css
  extractCSS: false
}
```

### Copy static files

By default, all files inside `./static` folder will be copied to the *root* of dist folder, eg: `./static/favicon.ico` will be copied to `./dist/favicon.ico`. You can set `copy` to `false` to disable this.

See more details about [staticFolder](/options#staticfolder) and [copy](/options#copy).

### Define env variables

By default you will have `process.env.NODE_ENV` defined.

There're two ways to define env variables:

- CLI options `--env.VARIABLE_NAME xxx`
- `env` option in config file

For example, when you have such configs:

```js
module.exports = {
  env: {
    APP_DESCRIPTION: 'my superb app'
  }
}
```

The value of each env variable is automatically stringified and passed to [webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/).

In your app:

```js
const description = process.env.APP_DESCRIPTION
// do something
```

In template html file which uses [lodash.template](https://lodash.com/docs/4.17.4#template) syntax, you can also access it under `htmlWebpackPlugin.options.env`:

```html
<meta name="description" content="<%= htmlWebpackPlugin.options.env.APP_DESCRIPTION %>" />
```

### Dev server

Basically it supports all options that're not marked as `CLI only` in [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/#devserver):

```js
module.exports = {
  devServer: {
    // eg: serve app over HTTPS
    https: true
  }
}
```

#### Proxy API request

To tell the development server to serve any `/api/*` request to your API server in development, you can set `proxy` in [devServer](/options#devserver) option:

```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:8080/api'
  }
}
```

This way, when you fetch `/api/todos` in your app, the development server will proxy your request to `http://localhost:8080/api/todos`.

<p class="warning">
  Keep in mind that **proxy** only has effects in development.
</p>

#### Custom server logic

This is supported by webpack-dev-server too, so simply do:

```js
module.exports = {
  devServer: {
    before(app) {
      app.get('/api', (req, res) => {
        res.end('This is the API')
      })
    }
  }
}
```
