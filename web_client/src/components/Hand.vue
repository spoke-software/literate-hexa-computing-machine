<template>
    <!-- TODO a bordered box for each element in the hand array -->
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    // TODO This is still from the Hello World thingy.
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        };
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    },
});
</script>

<style lang="sass">
.greeting
    font-size: 20px
</style>


