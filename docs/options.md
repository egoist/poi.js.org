# Options

Options are available in both CLI arguments and config file.

## General

### entry

Type: `string` `Array` `object`<br>
Default: value of pkg.main or `index.js`

The path to entry file.

### dist

Type: `string`<br>
Default: `dist`

Target folder for bundled files

### babel

Type: `Object`

Poi searches for `.babelrc` or `babel` field in `package.json`, if none of them exists, it uses default babel config:

```js
{
  babelrc: false,
  cacheDirectory: true,
  presets: [
    [require.resolve('babel-preset-poi'), { jsx: 'vue' }]
  ]
}
```

You can use this option in Poi config file if you don't want extra config file for babel.

### transformModules

Type: `Array` `string`<br>
Default: `undefined`

By default we only use `babel-loader` to transform files outside `node_modules` directory, but sometimes you need to transform modules which are written in ES2015 or above, then add the module names to `transformModules`:

```js
{
  transformModules: ['element-ready', 'p-cancelable']
}
```

### jsx

Type: `string`<br>
Default: `vue`<br>
Possible values: `vue` `react` or any JSX pragma like `h`

Specify a JSX transformer for JSX pragma.

Note that this option only works if you don't use a custom babel config, otherwise you should handle JSX transformation yourself :)

### postcss

Type: `Array` `object`

Poi searches for custom postcss config file using [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config), and add `autoprefixer` to the top of it when `postcss` is an array or object.

You can use this option to override it if you don't want extra config file for postcss.

### autoprefixer

Type: `object` `boolean`

Default:

```js
{
  browsers: ['ie > 8', 'last 4 versions']
}
```

Options for [autoprefixer](https://github.com/postcss/autoprefixer), set to `false` to disable it.

### cssModules

Type: `boolean`<br>
Default: `false`

Process CSS using [css modules](https://github.com/css-modules/css-modules).

### extractCSS

Type: `boolean`<br>
Default: `false`

Extract CSS into a single file.

<p class="warning">
  It defaults to `true` in production mode.
</p>

### html

Type: `Object` `Array` `boolean`

Default value:

```js
{
  // `pkg` indicates the data in `package.json`
  title: pkg.title || pkg.productName || pkg.name,
  description: pkg.description,
  env: {}, // env option
  template: // defaults to $cwd/index.ejs if it exists, otherwise use built-in template,
}
```

Options for [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) or an array of it. Set it to `false` to disable this plugin.

### inlineImageMaxSize

Type: `number`<br>
Default: `10000`

Inline the image (DataURL) into the bundle if it's smaller than this size (in bytes) with `url-loader`, otherwise `file-loader` is used.

`.svg` is always processed by `file-loader` because of [this](https://github.com/facebookincubator/create-react-app/pull/1180).

### filename

Type: `object`

filename of output files, eg:

```js
filename: {
  js: 'index.js',
  css: 'style.css',
  fonts: 'assets/fonts/[name].[ext]',
  images: 'assets/images/[name].[ext]',
  chunk: '[id].chunk.js'
}
```

### hash

Type: `boolean`<br>
Default: `undefined`

Exclude `[chunkhash]` from [output filename](https://webpack.js.org/configuration/output/#output-filename), you can use [filename](#filename) option to reach the same goal but this one is just simpler.

By default we only *hash* filename when it's built in production mode and option `format` was not set.

### moduleName

Type: `string`

Only required when `format` is set to `umd`, basically it's the same as [output.library](https://webpack.js.org/configuration/output/#output-library) in raw webpack config.

### staticFolder

Type: `string`<br>
Default: `static`

Copy files in this folder to the root of `dist` folder, eg: `./static/favicon.ico` will be copied to `./dist/favicon.ico`.

### copy

Type: `boolean` `object` `Array`<br>
Default: `true`

Options for [copy-webpack-plugin](https://github.com/kevlened/copy-webpack-plugin), it will always [copy `static/*` to `dist/*`](#staticfolder) if `./static` folder exists unless you have `copy` set to false.

### define

Type: `object`

Use `webpack.DefinePlugin` to replace string in source files, each value is stringified by default, eg:

```js
module.exports = {
  define: {
    __VERSION__: '1.0.0'
  }
}
```

### env

Type: `object`

Short hand for the `define` option to define constants under `process.env`. By default `process.env.NODE_ENV` is defined for you, eg:

```js
module.exports = {
  env: {
    SECRET: '******'
  }
}
```

### sourceMap

Type: `boolean` `string`<br>
Default: `true`

Generate sourcemaps. When it's `true` we will set internal `webpackConfig.devtool` to `eval-source-map` in dev mode, `inline-source-map` in test mode, and `source-map` in production mode.

### webpack

Type: `function`

Mutate raw webpack config and you must return the updated config:

```js
module.exports = {
  webpack(config) {
    config.plugins = config.plugins.filter(removeSomePlugin) // ...
    return config
  }
}
```

### extendWebpack

Type: `function`

Using [webpack-chain](https://github.com/mozilla-rpweb/webpack-chain) to modify webpack config in a predictable way:

```js
module.exports = {
  extendWebpack(config) {
    // Remove progress bar when building in production
    config.plugins.delete('progress-bar')
  }
}
```

More details about internal namings are coming soon.

## Production

### generateStats

<span class="badge">CLI only</span>

Type: `boolean` `string`

Output webpack stats to `stats.json` or a custom path.

### progress

<span class="badge">CLI only</span>

Type: `boolean`<br>
Default: `true`

Show progress bar while building, you can disable it by setting it to `false`.

### vendor

Type: `boolean`<br>
Default: `true`

Automatically split vendor code (all imported modules in `node_modules`) into `vendor` chunk.

### minimize

Type: `boolean`<br>
Default: `true`

Minimize JS and CSS files.

### homepage

Type: `string`<br>
Default: `/`

The path to load resource from, it's useful when your site is located at a sub pach like `http://example.com/blog`, you need to set `homepage` to `/blog/` or `http://example.com/blog/` in this situation.

### removeDist

Type: `boolean`<br>
Default: `undefined`

In production mode, we will remove `dist/*` by default when the generated files contain hash like `vendor.f8rbdf92.js`. And there's hash by default for long-term caching purpose.

To disable this, you can set it to `false`, to always enable this even if the filename does not contain hash, you can set it to `true`.

### component

Type: `boolean` `string`

Build your app as a component.

- `boolean`: Build in CommonJS format, output [filename](#filename) will default to current folder name in kebab case.
- `string`: Build in UMD format, and we set [moduleName](#modulename) to its value. Output filename will default to the moduleName in kebab case.

<p class="tip">
  Note that [html](#html), [sourceMap](#sourcemap) are also disabled when building as component.
</p>

## Development

### port

Type: `number`<br>
Default: `4000`

### host

Type: `string`<br>
Default: `0.0.0.0`

### devServer

Type: `object`

Options for [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) (only the options which are not marked as `CLI only`).

### hotReload

Type: `boolean`<br>
Default: `true`

Enable Hot Mode Reloading.

### hotEntry

Type: `string` `Array`<br>
Default: `client`

Add hot reload support to specific entries.

### restartOnFileChanges

Type: `string` `Array` `boolean`<br>
Default: It defaults to the path to Poi config file if it exists.

Restart Poi while the specified files are modified.

## Vue-specific options

### vue

Type: `object`

Provide custom options for `vue-loader`.

### templateCompiler

Type: `boolean`

Use Runtime + Compiler build of Vue.js
