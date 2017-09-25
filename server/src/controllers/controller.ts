import * as bluebird from "bluebird";

import { Game } from "../models/game";
import { IGameDocument } from "../models/documents/game";

/**
 * This will provide all interaction with games in the database that other front end facing controllers will extend
 */
export class Controller {
    static readonly MIN_NUM_TILES_TO_DRAW = 1;
    static readonly MAX_NUM_TILES_TO_DRAW = 6;

    drawHand(gameId: number, player: string): bluebird<string[]> {
        return Game.findOne({ gameId: gameId })
            .exec()
            .then(function onFulfill(game: IGameDocument) {
                let numTilesToDraw = Math.floor((Math.random() * (Controller.MAX_NUM_TILES_TO_DRAW - Controller.MIN_NUM_TILES_TO_DRAW + 1))
                    + Controller.MIN_NUM_TILES_TO_DRAW);

                return game.drawHand(player, numTilesToDraw);
            })
            .catch(function onReject(error) {
                console.log(`Error giving player ${player} a hand in game ${gameId}:`, error);
                return bluebird.reject("Unable to draw hand - please try again later");
            });
    }

    createGame(playerList: string[]) {
        return Game.createGame(playerList)
            .save()
            .then(function onFulfill(game: IGameDocument): number {
                console.log(`Created game ${game.gameId}!`);
                return game.gameId;
            })
            .catch(function onReject(error): number {
                console.log("Error creating game:", error);
                return -1;
            });
    }

    deleteGame(gameId: number) {
        return Game.remove({ gameId: gameId })
            .exec()
            .then(function onFulfill(removeResponse: void): boolean {
                //Idk the not hacky way to tell typescript the type of this object...
                let numDeleted = (<any>removeResponse).result.n;
                console.log(`Deleted ${numDeleted} games with id ${gameId}.`);
                return numDeleted !== 0;
            })
            .catch(function onReject(error: any): boolean {
                console.log(`Error deleting game ${gameId}:`, error.toString());
                return false;
            });
    }
}
