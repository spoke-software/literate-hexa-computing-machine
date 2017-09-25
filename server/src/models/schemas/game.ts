import { Schema, connection } from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

import { Game } from "../game";
import { Player } from "../player";
import { IGameDocument } from "../documents/game";
import { IPlayerDocument } from "../documents/player";
import { playerSchema } from "./player";
import { getArrayOfStartingTiles } from "../../utils/utils";

/*
 * The schema declares the data types for MongoDB
 * Can also define static and nonstatic methods on the schema to use on the model, but must be declared in the model interface
 */
export var gameSchema: Schema = new Schema({
    gameId: Number,
    playerList: [playerSchema],
    tileBag: [String],
    board: [[String]]
});

autoIncrement.initialize(connection);
gameSchema.plugin(autoIncrement.plugin, {
    model: "Game",
    field: "gameId",
    startAt: 1,
    incrementBy: 1
});

gameSchema.statics.createGame = function (playerNames: string[]): IGameDocument {
    let game = new Game();
    game.playerList = [];
    playerNames.forEach(function (name) {
        game.playerList.push(Player.createPlayer(name));
    });
    game.tileBag = getArrayOfStartingTiles();
    return game;
};

gameSchema.methods.getPlayer = function (playerName: string): IPlayerDocument {
    return (<IPlayerDocument[]>this.playerList).find(player => player.name === playerName) || null;
}

gameSchema.methods.drawHand = function (playerName: string, numTiles: number) {
    let player = <IPlayerDocument>this.getPlayer(playerName);

    if (player === null) {
        throw new Error("Player is not in the game.");
    }

    if (numTiles > this.tileBag.length) {
        numTiles = this.tileBag.length;
    }

    let tiles: string[] = [];
    for (let i = 0; i < numTiles; i++) {
        let tileIndex = (Math.random() * (this.tileBag.length));
        let tile: string[] = this.tileBag.splice(tileIndex, 1);
        tiles.push(tile[0]);
    }

    let expectedHand = player.addToHand(tiles);

    return (<IGameDocument>this).save().then(function onFullfil(game: IGameDocument) {
        if (expectedHand != player.hand) {
            console.warn(`Warning: Player ${player} in game ${game} should have hand ${expectedHand} but has hand ${player.hand}`);
        }
        return player.hand;
    });
}