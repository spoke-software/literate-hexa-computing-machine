# Web client front end

Currently this is just the "Hello, World!" app from [this tutorial](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html). Do please replace the code with the real thing (and delete this line)!

**Note:** When adding new TypeScript files, make sure you use the `.tsx` ending to enable [TypeScript's JSX support](https://www.typescriptlang.org/docs/handbook/jsx.html).

## Setting up

Make sure you have webpack installed globally:
```
npm install -g webpack
```

Run this in the `web_client` directory to populate `node_modules/` with sweet, sweet dependencies:
```
npm install
```

## Building and deploying

Transmogrificating TypeScript/React files from `src/` into JS files in `dist/` is as simple as running this in the `web_client` directory:
```
webpack
```

After that, just open `index.html` in your browser.

## TODO
- Install Bower and use it for front end dependencies (probably including the React and ReactDOM JS files currently being imported to `index.html` from `node_modules/`).
- Install Sass (using npm) and configure Webpack to transpile it for us. (This will require a Sass loader for Webpack.)
- Write the app and stuff!
