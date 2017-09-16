import { Model, model } from "mongoose";

import { gameSchema } from "./schemas/game";
import { IGameDocument } from "./documents/game";

/*
 * Extend the base Model so we can have a static create function (since we cannot provide additional constructors).
 * Implementation is done in the schema.
 */
interface IGameModel extends Model<IGameDocument> {
    createGame(playerNames: string[]): IGameDocument;
}

/*
 * The model is how we interact with the schema (can think of it essentially as a DAO)
 */
export const Game: IGameModel = model<IGameDocument, IGameModel>("Game", gameSchema);
