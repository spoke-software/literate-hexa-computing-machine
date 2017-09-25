import { suite, test } from "mocha-typescript";
import { expect } from "chai";

import { Player } from "../../src/models/player";

@suite("A player")
class PlayerTest {

    @test("can be created with a given name and empty hand")
    public createPlayer() {
        const name = "playerName";
        let player = Player.createPlayer(name);

        expect(player.name).to.equal(name);
        expect(player.hand).to.be.empty;
    }

    @test("can add tiles to existing hand")
    public addTilesToExistingHand() {
        let startingTiles = ["a", "b"];
        let additionalTiles = ["c", "d"];
        let player = new Player();
        player.hand = startingTiles;
        player.addToHand(additionalTiles);

        expect(player.hand).to.deep.equal([...startingTiles, ...additionalTiles]);
    }

    @test("can add tiles to empty hand")
    public addTilesToEmptyHand() {
        let startingTiles = ["a", "b"];
        let player = new Player();
        player.addToHand(startingTiles);

        expect(player.hand).to.deep.equal([...startingTiles]);
    }
}