# Web server back end

Currently this is just the starter server code from [this tutorial](https://www.codeproject.com/Articles/871622/Writing-a-Chat-Server-using-Node-js-TypeScript-and). Do please replace the code with the real thing (and delete this line)!

## Setting up
Run this in the `server` directory to populate `node_modules/` with sweet, sweet dependencies:
```
npm install
```

## Building and deploying

Transmogrificating TypeScript files from `src/` into JS files in `dist/` and starting the node server is as simple as running this in the `server` directory:
```
npm run start
```

Alternatively, for a more fluid dev experience that will automatically recompile your TypeScript files and restart your node server anytime you change a file, simply run this in the `server` directory:
```
npm run dev
```

After that, just open `testClient.html` in your browser, click connect, and you can start sending messages!

## TODO
- Figure out the database we want to use, find ORM/typings
- Figure out ruleset (document in wiki!)
- Write the app and stuff!
