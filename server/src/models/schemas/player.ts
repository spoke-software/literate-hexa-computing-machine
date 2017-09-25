import { Schema } from "mongoose";

import { Player } from "../player";
import { IPlayerDocument } from "../documents/player";

/*
 * The schema declares the data types for MongoDB
 * Can also define static and nonstatic methods on the schema to use on the model, but must be declared in the model interface
 * NOTE: As this is a subdocument to game, we don't need to save things here, we need to save the game after these operations have changed things.
 */
export var playerSchema: Schema = new Schema({
        name: String,
        hand: [String]
});

playerSchema.statics.createPlayer = function (playerName: string): IPlayerDocument {
    let player = new Player();
    player.name = playerName;
    player.hand = [];
    return player;
};

playerSchema.methods.addToHand = function (tiles: string[]) {
    this.hand = this.hand.concat(tiles);
    return this.hand;
}