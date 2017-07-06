# Electron app

Basically you need to set `target: 'electron-renderer'` for webpack to exclude built-in Electron modules from your bundle:

```js
// poi.config.js
module.exports = {
  webpack(config) {
    config.target = 'electron-renderer'
    return config
  },
  // In packaged app
  // Electron can only load files from relative path
  homepage: './'
}
```

This is equivalent to using `extendWebpack`:

```js
// poi.config.js
module.exports = {
  extendWebpack(config) {
    config.target('electron-renderer')
  }
}
```

Then in the entry file of [Electron's main process](https://github.com/electron/electron-quick-start/blob/master/main.js), you need to load corresponding `index.html` of renderer process for different mode:

```js
const isDev = require('electron-is-dev')
const mainWindow = new BrowserWindow({width: 800, height: 600})

const url = isDev ? 'http://localhost:4000' : `file://path/to/generated/index.html`
mainWindow.loadURL(url)
```