import {Document} from "mongoose";

/*
 * The document declares the data types for TypeScript
 */
export interface IGameDocument extends Document {    
    playerList: string[];
    handsList: string[][];
    tileBag: string[];
    board: string[];
}
