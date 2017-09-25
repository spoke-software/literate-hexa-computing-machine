import { suite, test } from "mocha-typescript";
import { expect, should, use } from "chai";
import * as cap from "chai-as-promised";
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

import { Game } from "../../src/models/game";
import { Player } from "../../src/models/player";
import { IPlayerDocument } from "../../src/models/documents/player";
import { getArrayOfStartingTiles } from "../../src/utils/utils";

@suite("A game")
class GameTest {

    public static before() {
        use(cap);
        // Use bluebird promises - mongoose promise lib is deprecated ):
        (<any>mongoose).Promise = bluebird;
    }

    @test("can be created with a new player for each name supplied")
    public createGame() {
        let playerNames = ["a", "b"];
        let game = Game.createGame(playerNames);

        expect(game.playerList.map(iPlayerDocument => iPlayerDocument.name)).to.deep.equal([...playerNames])
        expect(game.tileBag).to.deep.equal(getArrayOfStartingTiles());
    }

    @test("can get a player when given the name of the player")
    public getPlayer() {
        let name = "playerName";

        let game = new Game();
        let player = new Player();
        player.name = name;
        game.playerList.push(player);

        expect(game.getPlayer(name).name).to.equal(name);
    }

    @test("will return null if it is asked for a player with a name it does not have")
    public getInvalidPlayer() {
        let invalidName = "Jason";
        let validName = "Sean";

        let game = new Game();
        let player = new Player();
        player.name = validName;
        game.playerList.push(player);

        expect(game.getPlayer(invalidName)).to.be.null;
    }

    @test("will draw a hand of tiles for a player")
    public drawTiles(done: MochaDone) {
        let handToReturn = ["a", "b"];
        let playerName = "Will";
        let numTilesToDraw = 2;
        
        let game = new Game();
        let player = new Player();
        player.name = playerName;
        game.playerList.push(player);
        game.tileBag = handToReturn;

        //Mock the save - we don't want to connect to the db, just return it as if we had...
        game.save = function() {
            return bluebird.resolve(game);
        }

        expect(game.drawHand(playerName, numTilesToDraw)).to.eventually.have.members(handToReturn).then(() => done());
    }

    @test("will throw an error if asked to draw a hand for an invalid player")
    public drawTilesForInvalidPlayer() {
        let playerName = "Will";
        let invalidPlayer = "Jason";
        let numTilesToDraw = 5;
        let game = new Game();
        let player = new Player();
        player.name = playerName;
        game.playerList.push(player);

        should().throw(() => game.drawHand(invalidPlayer, numTilesToDraw));
    }
}