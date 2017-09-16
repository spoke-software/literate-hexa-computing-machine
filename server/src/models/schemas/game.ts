import { Schema, connection } from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

import { Game } from "../game";
import { IGameDocument } from "../documents/game";
import { getArrayOfStartingTiles } from "../../utils/utils";

/*
 * The schema declares the data types for MongoDB
 * Can also define static and nonstatic methods on the schema to use on the model, but must be declared in the model interface
 */
export var gameSchema: Schema = new Schema({
    gameId: Number,
    playerList: [String],
    handsList: [[String]],
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
    game.playerList = playerNames;
    game.tileBag = getArrayOfStartingTiles();
    return game;
};

gameSchema.methods.playerInGame = function (player: string) {
    return this.playerList.indexOf(player) !== -1;
}

gameSchema.methods.playerHasHand = function (player: string) {
    return this.handsList.length !== 0 && //if no one has hands
        this.handsList[this.playerList.indexOf(player)] && //if this player never had a hand before but was after someone who does..
        this.handsList[this.playerList.indexOf(player)][0] !== null && //if this player never had a hand before but was before someone who does....
        this.handsList[this.playerList.indexOf(player)].length !== 0;
}

gameSchema.methods.drawHand = function (player: string, numTiles: number) {
    if (!this.playerInGame(player)) {
        throw new Error("Player is not in the game.");
    } else if (this.playerHasHand(player)) {
        throw new Error("Player already has a hand.");
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

    this.handsList[this.playerList.indexOf(player)] = tiles;
    this.markModified('handsList'); // needed because of array or something...?

    return (<IGameDocument>this).save().then(function onFullfil(game: IGameDocument) {
        return game.handsList[game.playerList.indexOf(player)];
    });
}