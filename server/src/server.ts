import * as WebSocket from "ws";
import * as mongoose from 'mongoose';

import {WsController} from "./controllers/wsController";

/*
 * Initialize db 
 */
var mongoURI = process.env["MONGO_URI"];
mongoose.connect(mongoURI, {
    useMongoClient: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'MongoDB Connection error:'));

db.once("open", function() {
    /*
    * Initialize ws server
    */
    let port = parseInt(process.env.PORT, 10) || 3001;
    let WebSocketServer = WebSocket.Server;
    let server = new WebSocketServer({ port: port });

    /*
    * Initialize ws controller and set to handle incoming ws connections
    */
    let wsController = new WsController();
    server.on('connection', wsController.onConnection.bind(wsController));

    console.log('WS Server is running on port', port);
});
