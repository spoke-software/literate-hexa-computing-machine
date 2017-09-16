import { Document } from "mongoose";

/*
 * The document declares the data types for TypeScript
 */
export interface IGameDocument extends Document {
    gameId: number;
    playerList: string[];
    handsList: string[][];
    tileBag: string[];
    board: string[][];
}
