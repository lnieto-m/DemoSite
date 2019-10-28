<template>
    <div>
        <div v-for="poke in pokelist" v-bind:key="poke.url">{{poke.name}}</div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "ScrollList",
    data() {
        return {
            loaded: false,
            pokelist: [],
            count: 0,
            error: "Nothing"
        }
    },
    created() {
        var url = "https://pokeapi.co/api/v2/pokemon?&limit=20"
        // var pokemonList = []
        // while (url != "") {
            axios.get(url)
            .then(res => {
                this.pokelist = res.data.results;
                this.count = res.data.count;
                if (res.data.next == null) {
                    url = ""
                } else {
                    url = res.data.next
                }
            })
            .catch(err => this.error = err);
        // }
        this.loaded = true
        // this.pokelist = pokemonList
    }
}
</script>

<style scoped>

</style>