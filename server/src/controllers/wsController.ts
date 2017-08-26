import * as WebSocket from "ws";

import {Game} from "../models/game";

/**
 * This controller will allow a frontend to use the backend via ws websockets
 */
export class WsController {

    onConnection(ws: WebSocket) {
        console.log("Client joined!");
        ws.on('message', message => {
            try {
                let messageJSON = JSON.parse(message.toString());
                if (messageJSON.createGame) {
                    this.createGame(ws, messageJSON.createGame.players);
                } else if (messageJSON.deleteGame) {
                    this.deleteGame(ws, messageJSON.deleteGame);
                } else {
                    console.log("Need to implement ", messageJSON);
                }
            } catch(e) {
                ws.send(message + ' back at\'cha!');
                console.log('Failed to parse: "' + message + '" - echoing it back.');
            }
        });
    }

    createGame(ws: WebSocket, playerList: string[]) {
        Game.createGame(playerList).save(function(err, product, numAffected) {
            if(err) {
                ws.send(err.toString());
            } else {
                ws.send(product.toString());
            }
        });
    }

    deleteGame(ws: WebSocket, player: string) {
        Game.remove({
            playerList: player
        }, function(err) {
            if(err) {
                ws.send(err.toString());
            } else {
                ws.send("Successfully deleted!");
            }
        });
    }

}

/* Test messages here, cause I'm lazy...
{
    "createGame": {
        "players": ["Will", "Sean", "Jason"]
    }
}

{
    "deleteGame": "Will"
}
*/
