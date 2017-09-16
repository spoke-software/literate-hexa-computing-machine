//This file sets the mongoose promise typing to be bluebird. 
//This is necessary as the mongoose promises have been deprecated and we're replacing them with bluebird ones.
import * as Bluebird from "bluebird";
declare module "mongoose" { type Promise<T> = Bluebird<T>; }