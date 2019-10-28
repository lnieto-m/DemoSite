<template>
    <div id="pokedex">
        <ScrollList v-on:update-poke="update"></ScrollList>
        <PokemonMainVue :url="url"></PokemonMainVue>
    </div>
</template>

<script>

import ScrollList from './pokedex/ScrollList'
import PokemonMainVue from './pokedex/PokemonMainVue'

export default {
    name : "Pokedex",
    components: {
        ScrollList,
        PokemonMainVue
    },
    data() {
        return {
            url: "",
        }
    },
    methods: {
        update: function (url) {
            this.url = url
        }
    }
}
</script>

<style scoped>
#pokedex {
    display: block;
}
</style>