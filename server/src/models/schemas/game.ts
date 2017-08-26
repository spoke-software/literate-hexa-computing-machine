import {Schema} from "mongoose";

import {Game} from "../game";
import {IGameDocument} from "../documents/game";
import {getArrayOfStartingLetters} from "../../utils/utils";

/*
 * The schema declares the data types for MongoDB
 * Can also define static and nonstatic methods on the schema to use on the model, but must be declared in the model interface
 */
export var gameSchema: Schema = new Schema({
    playerList: [String],
    handsList: [[String]],
    tileBag: [String],
    board: [String]
});

gameSchema.statics.createGame = function(playerNames: string[]): IGameDocument {
    let game = new Game();
    game.playerList = playerNames;
    game.tileBag = getArrayOfStartingLetters();
    return game;
};