import * as WebSocket from "ws";

import { Controller } from "./controller";

/**
 * This controller will allow a frontend to use the backend via ws websockets
 */
export class WsController extends Controller {

    onConnection(ws: WebSocket) {
        console.log("Client joined!");
        ws.on("message", message => {
            try {
                let messageJSON = JSON.parse(message.toString());
                if (messageJSON.createGame) {
                    this.wsCreateGame(ws, messageJSON.createGame.players);
                } else if (messageJSON.deleteGame) {
                    this.wsDeleteGame(ws, messageJSON.deleteGame);
                } else if (messageJSON.drawHand) {
                    this.wsDrawHand(ws, messageJSON.drawHand.gameId, messageJSON.drawHand.player);
                } else {
                    console.log("Need to implement ", messageJSON);
                }
            } catch (e) {
                ws.send(message + " back at'cha!");
                console.log(`Failed to parse: '${message}' - echoing it back.`, e);
            }
        });
    }

    wsDrawHand(ws: WebSocket, gameId: number, player: string) {
        super.drawHand(gameId, player)
            .then(function onFullfil(hand) {
                ws.send("{\"hand\": " + hand + "}");
            });
    }

    wsCreateGame(ws: WebSocket, playerList: string[]) {
        super.createGame(playerList)
            .then(function onFullfil(gameId: number) {
                ws.send("{\"gameId\": " + gameId + "}");
            });
    }

    wsDeleteGame(ws: WebSocket, gameId: number) {
        super.deleteGame(gameId)
            .then(function res(response) {
                ws.send(JSON.stringify(response));
            })
            .catch(function rej(reason) {
                ws.send(JSON.stringify(reason));
            });
    }

}

/* Test messages here, cause I'm lazy...
{
    "drawHand": {
        "gameId": 3,
        "player": "Will"
    }
}

{
    "createGame": {
        "players": ["Will", "Sean", "Jason"]
    }
}

{
    "deleteGame": 2
}
*/
