# Web server back end

## Setting up
Run this in the `server` directory to populate `node_modules/` with sweet, sweet dependencies:
```
npm install
```

You must also set the environment property "MONGO_URI". The URI is pinned in the discord channel. See [here for more info.](https://nodejs.org/api/process.html#process_process_env)

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
NOTE: If you use npm run dev or run
```
npm run openTestClient
```
the testClient will open in your browser automagically.

## TODO
- Figure out the data model...
- Figure out ruleset (document in wiki!)
- Write the app and stuff!
