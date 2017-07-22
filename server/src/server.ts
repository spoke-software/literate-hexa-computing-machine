import WebSocket = require('ws');

let port = parseInt(process.env.PORT, 10) || 3001;
let WebSocketServer = WebSocket.Server;
let server = new WebSocketServer({ port: port });

server.on('connection', ws => {
    ws.on('message', message => {
        ws.send(message + " back at'cha!");
        console.log("Received: \"" + message + "\" - echoing it back.");
    });
});

console.log('Server is running on port', port);