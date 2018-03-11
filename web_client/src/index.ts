import Vue from 'vue';
import Vuex from 'vuex';

import AppComponent from './components/App.vue';

// Set up WebSocket connection
const socket = new WebSocket('ws://localhost:3001');
socket.onmessage = (message) => store.dispatch('handleMessage', message);

// The single state tree: one object for all application-level state
const store = new Vuex.Store({
    state: {
        board: [],
        currentPlayer: '',
        gameList: [],
        currentGameId: 0,
    },
    // Mutations are called with commit, can modify state (nothing else can), and must be synchronous
    mutations: {
        selectPlayer(state, payload) {
            console.debug(`Selecting player ${payload.name}!`);
            state.currentPlayer = payload.name;

            console.debug(`Getting ${payload.name}'s games!`);
            socket.send(JSON.stringify({
                retrieveGames: {
                    player: payload.name,
                },
            }));
        },
        selectGame(state, payload) {
            state.currentGameId = payload.gameId;
        },
        updateGameList(state, payload) {
            state.gameList = payload.games;
        },
    },
    // Actions are called with dispatch and can commit mutations and perform asynchronous operations
    // (including dispatching other actions)
    actions: {
        handleMessage(context, payload) {
            console.debug('Message received!');
            console.debug(payload.data);
            const message = JSON.parse(payload.data);

            // Reponse to a retrieveGames request
            if (message.games) {
                context.commit('updateGameList', message);
            }
        },
    },
});

const vue = new Vue({
    el: '#app',
    store, // Inject Vuex store into all child components (as this.$store)
    components: {
        AppComponent,
    },
    template: `
        <app-component></app-component>
    `,
});
