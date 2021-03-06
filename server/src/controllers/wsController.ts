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
                console.debug("messageJSON");
                console.debug(messageJSON);
                if (messageJSON.createGame) {
                    this.wsCreateGame(ws, messageJSON.createGame.players);
                } else if (messageJSON.retrieveGames) {
                    this.wsRetrieveGames(ws, messageJSON.retrieveGames.player);
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

    wsCreateGame(ws: WebSocket, playerList: string[]) {
        super.createGame(playerList)
            .then(function onFullfil(gameId: number) {
                ws.send('{"gameId": ' + gameId + '}');
            })
            .catch(function onReject(error) {
                ws.send(JSON.stringify(error));
            });
    }

    wsRetrieveGames(ws: WebSocket, player: string) {
        super.retrieveGames(player)
            .then(function onFullfil(games) {
                ws.send(JSON.stringify({ games }));
            })
            .catch(function onReject(error) {
                ws.send(JSON.stringify(error));
            });
    }

    wsDeleteGame(ws: WebSocket, gameId: number) {
        super.deleteGame(gameId)
            .then(function res(response) {
                ws.send(JSON.stringify(response));
            })
            .catch(function onReject(error) {
                ws.send(JSON.stringify(error));
            });
    }

    wsDrawHand(ws: WebSocket, gameId: number, player: string) {
        super.drawHand(gameId, player)
            .then(function onFullfil(hand) {
                ws.send('{"hand": ' + hand + '}');
            })
            .catch(function onReject(error) {
                ws.send(JSON.stringify(error));
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
    "retrieveGames": {
        "player": "Sean"
    }
}

{
    "deleteGame": 2
}

{
    "drawHand": {
        "gameId": 5,
        "player": "Will"
    }
}
*/
