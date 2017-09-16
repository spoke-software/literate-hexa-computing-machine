import { Document } from "mongoose";
import * as bluebird from "bluebird";

/*
 * The document declares the data types for TypeScript
 */
export interface IGameDocument extends Document {
    gameId: number;
    playerList: string[];
    handsList: string[][];
    tileBag: string[];
    board: string[][];

    drawHand(player: string, numTiles: number): bluebird<string[]>;
    playerHasHand(player: String): boolean;
    playerInGame(player: string): boolean;
}
