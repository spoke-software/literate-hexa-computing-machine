<template>
    <div v-if="currentPlayer === undefined" class="row">
        <login-component></login-component>
    </div>
    <div v-else>
        <board-component />
        <hand-component />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import BoardComponent from './Board.vue';
import HandComponent from './Hand.vue';

export default Vue.extend({
    components: {
        BoardComponent,
        HandComponent,
    },
    computed: {
        currentPlayer(): Object { // TODO What should the return type be? Should it be specified?
            return this['$store'].state.currentPlayer;
        },
    },
});
</script>

<style lang="sass">
.greeting
    font-size: 20px
</style>


