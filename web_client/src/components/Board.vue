<template>
    <!-- TODO a bordered box for each element in the board array -->
    <div>
        [insert board for game {{ currentGameId }} here]
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from 'vuex';

export default Vue.extend({
    computed: mapState([
        'currentPlayer',
        'currentGameId',
    ]),
});
</script>

<style lang="sass">
</style>

