<template>
    <div v-if="loaded==false" class="loaded">
        <img src="@/assets/grey_pokeball.png" class="center"/>
        <!-- <img src="https://bulbapedia.bulbagarden.net/wiki/File:001MS.png" class="center" /> -->
    </div>
    <div v-else id="pokevue">
        <img :src="spriteUrl" />
        <div>
            {{pokemonInfo.id}} {{pokemonInfo.name}}
            Height : {{pokemonInfo.height}} m
            Weight : {{pokemonInfo.weight}} kg
        </div>
        <!-- {{pokemonInfo}} -->
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "PokemonMainVue",
    props: ["url"],
    data() {
        return {
            loaded: false,
            spriteUrl: "",
            pokemonInfo: {
                name: "",
                id: 0,
                height: 0,
                weight: 0,
                description: "",
                stats: {
                    Hp : 0,
                    Atk: 0,
                    Def: 0,
                    "Sp. Atk": 0,
                    "Sp. Def": 0,
                    Speed: 0
                    },
            },
            display: "Nothing to see here"
        }
    },
    watch: {
        url: function () {
            axios.get(this.url)
                .then(res => {
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

                    var spriteExceptions = {
                        "tapu-koko":"tapukoko",
                        "tapu-lele":"tapulele",
                        "tapu-bulu":"tapubulu",
                        "tapu-fini":"tapufini",
                        "mr-mime": "mr._mime",
                        "mime-jr": "mime_jr",
                        "nidoran-m": "nidoran_m",
                        "nidoran-f": "nidoran_f",
                        "type-null": "typenull"
                    }
                    var name = ""
                    if (exception.includes(res.data.species.name.split('-')[0]) == true) {
                        name = res.data.species.name.replace('-', ' ')
                    } else {
                        name = res.data.species.name.split('-')[0]
                    }
                    this.pokemonInfo.name = name.charAt(0).toUpperCase() + name.slice(1)
                    this.pokemonInfo.id = res.data.id
                    this.pokemonInfo.height = res.data.height / 10
                    this.pokemonInfo.weight = res.data.weight / 10
                    if (res.data.species.name in spriteExceptions) {
                        this.spriteUrl = "https://projectpokemon.org/images/normal-sprite/" + spriteExceptions[res.data.species.name] + ".gif"
                    } else {
                        this.spriteUrl = "https://projectpokemon.org/images/normal-sprite/" + res.data.species.name + ".gif"
                    }
                    this.loaded = true
                })
                .catch(err => console.log(err))      
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