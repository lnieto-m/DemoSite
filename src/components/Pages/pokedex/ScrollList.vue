<template>
    <div id="scrolllist">
        <b-input-group id="search">
            <b-form-input v-model="search" placeholder="Search..."></b-form-input>
        </b-input-group>
        <b-list-group id="list">
            <b-list-group-item button v-for="poke in filteredPokemons"
                v-bind:key="poke.url"
                @click="$emit('update-poke', poke.url)">
                <img :src="poke.miniaUrl" />
                {{poke.name}}
            </b-list-group-item>
        </b-list-group>
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
            scrollPosition: 0,
            error: "Nothing",
            search: '',
        }
    },
    computed: {
        filteredPokemons() {
            return this.pokelist.filter(poke => {
                return poke.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
        }
    },
    created() {
        var url = "https://pokeapi.co/api/v2/pokemon?&limit=807"
        axios.get(url)
            .then(res => {
                this.pokelist = res.data.results.map(poke => {
                    var exception = [
                        "tapu",
                        "jangmo",
                        "hakamo",
                        "kommo",
                        "mr",
                        "mime",
                        "nidoran",
                        "ho",
                        "type"
                    ]
                    var name = ""
                    if (exception.includes(poke.name.split('-')[0]) == true) {
                        name = poke.name
                    } else {
                        name = poke.name.split('-')[0]
                    }
                    return {
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                        url: poke.url,
                        miniaUrl: "https://img.pokemondb.net/sprites/sun-moon/icon/" + name +".png",
                    }
                });
                this.count = res.data.count;
                
            })
            .catch(err => this.error = err);
        this.loaded = true
    },
}
</script>

<style scoped>
#scrolllist {
    width: 30%;
    display: inline-block;
    vertical-align: bottom;
}

#list {
    height: 90vh;
    overflow: scroll;
}

</style>