# Resolve modules without dot hell

In a large project you may have a deep nested folder structure, for example, if you want to require `$project/src/components/Header.vue` in `$project/src/views/Home/guest/index.vue`, you have to write something like:

```js
import Header from '../../components/Header.vue'
```

It's easy to make mistake by introducing the [dot hell](https://github.com/substack/browserify-handbook#avoiding-).

Instead, as many people use `src` folder as the main directory for their app, you can also use `@` to indicate the path to `src` folder, then it becomes:

```js
import Header from '@/components/Header.vue'
```
However, the use of alias will result in path tips and IntelliSense do not work.  
You can solve this problem by configuring [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "target": "ES6",
    "module": "commonjs",
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

After the configuration is successful, restart VSCode to take effect.
