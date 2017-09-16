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

gameSchema.statics.createGame = function (playerNames: string[]): IGameDocument {
    let game = new Game();
    game.playerList = playerNames;
    game.tileBag = getArrayOfStartingTiles();
    return game;
};

autoIncrement.initialize(connection);
gameSchema.plugin(autoIncrement.plugin, {
    model: "Game",
    field: "gameId",
    startAt: 1,
    incrementBy: 1
});