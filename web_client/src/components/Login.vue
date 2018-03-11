<!-- Provides a view for entering a player's name and choosing a game -->

<template>
    <div>
        <div v-if="!currentPlayer">
            <h1>What's your name?</h1> <!-- TODO Randomize this message for funsies -->
            <h2>(Note: case-sensitive)</h2>
            <input v-model="playerName">
            <button v-on:click="selectPlayer">Submit</button>
        </div>
        <div v-else>
            <!-- Choose a game -->
            <div> <!-- TODO left column -->
                <h1>You're {{currentPlayer}}! ...Right?</h1>
                <h2>Here are your games:</h2>
                <ul>
                    <li v-for="game in gameList">
                        <a href="#" v-on:click="selectGame(game.gameId)">{{ game.gameId }}</a>
                    </li>
                </ul>
            </div>

            <!-- Create a game -->
            <div> <!-- TODO right column -->
                <h2>Or you can start a new one:</h2>
                <!-- TODO add widgets for configuring the game -->
                <button v-on:click="createGame">Create game</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
    data() {
        return {
            playerName: '',
        };
    },
    methods: {
        selectPlayer() {
            // TODO Validate inputs
            this.$store.commit('selectPlayer', {
                name: this.$data.playerName,
            });
        },
        selectGame(gameId: number) {
            this.$store.commit('selectGame', { gameId });
        },
        createGame() {
            // TODO
        },
    },
    computed: mapState([
        'currentPlayer',
        'gameList',
    ]),
});
</script>

<style lang="sass">
</style>



