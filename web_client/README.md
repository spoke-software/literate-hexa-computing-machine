# Web client front end

Currently this is just the "Hello, World!" app from [this tutorial](https://github.com/Microsoft/TypeScript-Vue-Starter). Do please replace the code with the real thing (and delete this line)!

## Setting up

Run this in the `web_client` directory to populate `node_modules/` with sweet, sweet dependencies:
```
npm install
```

## Developing

To add a new npm dependency:
```
npm install <package> --save[-dev]
```

Use `--save` or `--save-dev` at your discretion: the former is for packages that get bundled and delivered with the app, the latter for those used only in development to produce the app.

When bundling a new dependency with the app, make sure it's included in `index.html` and, if necessary, under `external` in `webpack.config.js`.

## Building and deploying

In `package.json` you'll find npm scripts for transmogrificating Vue/TypeScript/Sass files from `src/` into JS files in `dist/`.

Run them like this:
```
npm run build
```

This one will watch the filesystem for changes:
```
npm run dev
```

After that, just open `index.html` in your browser.

## TODO
- Consider configuring Webpack to automatically generate `index.html` using the [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin).
- Look into using Bower or Yarn for front end dependencies (probably including the Vue and Vuex JS files currently being imported to `index.html` from `node_modules/`).
- Figure out how to do a production build, i.e. create a package containing minified versions of only what is needed to run the app (see [here](https://stackoverflow.com/a/31228568/490396) and [here](https://github.com/webpack/webpack/issues/615#issuecomment-65867995) and [here](https://github.com/webpack-contrib/sass-loader#in-production) for starters).
- Install [Vuex](https://github.com/vuejs/vuex) for state management (like Redux).
- Write the app and stuff!
