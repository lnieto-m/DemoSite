<template>
    <div v-if="loaded==false" class="loaded">
        <img src="@/assets/grey_pokeball.png" class="center"/>
    </div>
    <div v-else id="pokevue">{{pokemonInfo}}</div>
</template>

<script>

import axios from 'axios';

export default {
    name: "PokemonMainVue",
    props: ["url"],
    data() {
        return {
            loaded: false,
            pokemonInfo: {},
            display: "Nothing to see here"
        }
    },
    watch: {
        url: function () {
            axios.get(this.url)
                .then(res => this.pokemonInfo = res.data)
                .catch(err => console.log(err))
            this.loaded = true
        }
    }
}
</script>

<style scoped>
#pokevue {
    display: inline-block;
    width: 70%;
    height: 93vh;
    overflow-y: scroll;
}

.loaded {
    align-content: center;
    display: inline-block;
    width: 70%;
    height: 93vh;
    /* background-color:  gray; */
}

.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
    margin-top: 30vh;
    width: 25vh;
}
</style>