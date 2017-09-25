import { Document } from "mongoose";
import * as bluebird from "bluebird";

import { IPlayerDocument } from "./player";

/*
 * The document declares the data types for TypeScript
 */
export interface IGameDocument extends Document {
    gameId: number;
    playerList: IPlayerDocument[];
    tileBag: string[];
    board: string[][];
    
    getPlayer(player: string): IPlayerDocument;
    drawHand(player: string, numTiles: number): bluebird<string[]>;
}