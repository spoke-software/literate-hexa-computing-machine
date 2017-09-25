import { Document } from "mongoose";

/*
 * The document declares the data types for TypeScript
 */
export interface IPlayerDocument extends Document {
    name: string;
    hand: string[];

    addToHand(tiles: string[]): string[];
}
