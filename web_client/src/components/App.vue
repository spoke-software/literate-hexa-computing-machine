<template>
    <div>
        <div v-if="!currentPlayer || !currentGameId">
            <login-component></login-component>
        </div>
        <div v-else>
            <board-component></board-component>
            <!--<hand-component></hand-component>-->
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from 'vuex';

import LoginComponent from './Login.vue';
import BoardComponent from './Board.vue';
import HandComponent from './Hand.vue';

export default Vue.extend({
    components: {
        LoginComponent,
        BoardComponent,
        HandComponent,
    },
    computed: mapState([
        'currentPlayer',
        'currentGameId',
    ]),
});
</script>

<style lang="sass">
.greeting
    font-size: 20px
</style>


