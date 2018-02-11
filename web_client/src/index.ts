import Vue from 'vue';
import Vuex from 'vuex';

import AppComponent from './components/App.vue';

// Set up WebSocket connection
const socket = new WebSocket('ws://localhost:3001');
socket.onmessage = (message) => store.dispatch('handleMessage', message);

// The single state tree: one object for all application-level state
const store = new Vuex.Store({
    state: {
        // TODO How should these be initialized?
        board: [],
        currentPlayer: {},
    },
    mutations: {
        selectPlayer(state, payload) {
            // TODO How should we access the WebSocket?
            // TODO Get player with given name (needs to be implemented on the back end)
            socket.send({
                name: payload.name,
            });
        },
    },
    actions: {
        handleMessage(message) {
            // TODO Use this action (or something) to commit updates received from the websocket
            console.debug('Message received!');
            console.debug(message);
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
        <app-component>
    `,
});
