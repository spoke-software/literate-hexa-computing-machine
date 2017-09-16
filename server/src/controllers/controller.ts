import { Game } from "../models/game";
import { IGameDocument } from "../models/documents/game";

/**
 * This will provide all interaction with games in the database that other front end facing controllers will extend
 */
export class Controller {

    createGame(playerList: string[]) {
        return Game.createGame(playerList)
            .save()
            .then(function onFulfill(game: IGameDocument): number {
                console.log(`Created game ${game.gameId}!`);
                return game.gameId;
            })
            .catch(function onReject(error): number {
                console.log(`Error creating game: `, error);
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
