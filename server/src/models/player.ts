import { Model, model } from "mongoose";

import { IPlayerDocument } from "./documents/player";
import { playerSchema } from "./schemas/player";

/*
 * Extend the base Model so we can have a static create function (since we cannot provide additional constructors).
 * Implementation is done in the schema.
 */
interface IPlayerModel extends Model<IPlayerDocument> {
    createPlayer(playerName: string): IPlayerDocument;
}

/*
 * The model is how we interact with the schema (can think of it essentially as a DAO)
 */
export const Player: IPlayerModel = model<IPlayerDocument, IPlayerModel>("Player", playerSchema);
