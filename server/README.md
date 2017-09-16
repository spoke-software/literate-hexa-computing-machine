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

## Debugging - 'cause sometimes typescript is weird...

I have included a vscode launch.json which should allow you to debug in vscode right out of the box(let me know if it doesn't... I haven't tried to pull this down on a different pc yet)! Simply make sure you're not running the app already, then go to the debug pane (4th from the top, currently) and hit go! Note that changes won't cause recompiles/redeploys like they do when you're in dev mode, so you'll need to redo that yourself. 

## TODO
- Figure out the data model... (Especially making a new table for players! parallel arrays suck)
- Make the WS routing more robust
- Figure out communication between front end and back end with regard to how turns will be sent
- Figure out ruleset (document in wiki!)
- Write the app and stuff!
