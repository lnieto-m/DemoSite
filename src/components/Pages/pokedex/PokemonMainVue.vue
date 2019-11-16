<template>
    <div v-if="loaded==false" class="loaded">
        <img src="@/assets/grey_pokeball.png" class="center"/>
        <!-- <img src="https://bulbapedia.bulbagarden.net/wiki/File:001MS.png" class="center" /> -->
    </div>
    <div v-else id="pokevue">
        <div id="mainview">
            <b-img style="max-height:100%;float:right" :src="spriteUrl" fluid></b-img>
            <div style="float:left;margin-top:50px;">
                {{pokemonInfo.id}} {{pokemonInfo.name}}<br/>
                Height : {{pokemonInfo.height}} m<br/>
                Weight : {{pokemonInfo.weight}} kg<br/>
                <b-badge v-bind:style="{backgroundColor: typeTable[pokemonInfo.type[0]]}">{{pokemonInfo.type[0]}}</b-badge>
                <b-badge v-if="pokemonInfo.type.length > 1" v-bind:style="{backgroundColor: typeTable[pokemonInfo.type[1]]}">{{pokemonInfo.type[1]}}</b-badge><br />
            </div>
        </div>
        <div>
            <div>
                {{pokemonInfo.description}}
            </div>
            <div>
                <div v-bind:key="name" v-for="(value, name) in pokemonInfo.stats" class="row mb-1">
                    <div class="col-sm-2">{{name}}:</div>
                    <div class="col-sm-10 pt-1">
                        <b-progress show-value class="mb-1">
                            <b-progress-bar :value="value.value" :max=255 v-bind:style="{backgroundColor: value.color}"></b-progress-bar>
                        </b-progress> 
                    </div>
                </div>
            </div>
            <div>
                <b-tabs content-class="mt-3">
                    <b-tab title="Evolution" active>

                    </b-tab>
                    <b-tab title="Forms">

                    </b-tab>
                </b-tabs>
            </div>
        </div>
        <!-- {{pokemonInfo}} -->
    </div>
</template>

<script>

import axios from 'axios';
// import 'rainbowvis.js';

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
                type: [],
                stats: {
                    Hp :{value: 0, color: "0"},
                    Atk:{value: 0, color: "0"},
                    Def:{value: 0, color: "0"},
                    "Sp. Atk":{value: 0, color: "0"},
                    "Sp. Def":{value: 0, color: "0"},
                    Speed:{value: 0, color: "0"}
                },
            },
            display: "Nothing to see here",
            typeTable: {
                Bug: "#a8b820",
                Dark: "#ffffff",
                Dragon: "#4c08ef",
                Electric: "#f0c108",
                Fairy: "#F98CFF",
                Fighting: "#9d2721",
                Fire: "#f08030",
                Flying: "#a890f0",
                Ghost: "#554374",
                Grass: "#78c850",
                Ground: "#d4a82f",
                Ice: "#98d8d8",
                Normal: "#a8a878",
                Poison: "#a040a0",
                Psychic: "#f61c5d",
                Rock: "#93802d",
                Steel: "#b8b8d0",
                Water: "#386ceb"
            }
        }
    },
    watch: {
        url: function () {
            axios.get(this.url)
                .then(res => {
                    // Formating exceptions
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

                    // Sprites are not from the Pokeapi, so the name formating is sometimes different
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

                    // Get general data
                    this.pokemonInfo.name = name.charAt(0).toUpperCase() + name.slice(1)
                    this.pokemonInfo.id = res.data.id
                    this.pokemonInfo.height = res.data.height / 10
                    this.pokemonInfo.weight = res.data.weight / 10
                    
                    // Get 3D sprite
                    if (res.data.species.name in spriteExceptions) {
                        this.spriteUrl = "https://projectpokemon.org/images/normal-sprite/" + spriteExceptions[res.data.species.name] + ".gif"
                    } else {
                        this.spriteUrl = "https://projectpokemon.org/images/normal-sprite/" + res.data.species.name + ".gif"
                    }

                    // Get Battle Stats
                    var Rainbow = require('rainbowvis.js')
                    var myRainbow = new Rainbow()
                    myRainbow.setNumberRange(1, 255)
                    myRainbow.setSpectrum('red', '#fca103', '#03fc3d', '#03fcf8')
                    this.pokemonInfo.stats = {
                        Hp: {value: res.data.stats[5].base_stat, color: "#" + myRainbow.colourAt(res.data.stats[5].base_stat)},
                        Atk: {value: res.data.stats[4].base_stat, color: "#" + myRainbow.colourAt(res.data.stats[4].base_stat)},
                        Def: {value: res.data.stats[3].base_stat, color: "#" + myRainbow.colourAt(res.data.stats[3].base_stat)},
                        "Sp. Atk": {value: res.data.stats[2].base_stat, color: "#" + myRainbow.colourAt(res.data.stats[2].base_stat)},
                        "Sp. Def": {value: res.data.stats[1].base_stat, color: "#" + myRainbow.colourAt(res.data.stats[1].base_stat)},
                        Speed: {value: res.data.stats[0].base_stat, color: "#" + myRainbow.colourAt(res.data.stats[0].base_stat)}
                    }

                    // Get types
                    this.pokemonInfo.type = []
                    this.pokemonInfo.type.push(res.data.types[0].type.name)
                    if (res.data.types.length > 1) {
                        this.pokemonInfo.type.push(res.data.types[1].type.name)
                    }
                    this.pokemonInfo.type.reverse()

                    // Get Pokedex entry. For some reason it is not included in the base request
                    var descriptionURL = 'https://pokeapi.co/api/v2/pokemon-species/'+res.data.id
                    axios.get(descriptionURL)
                        .then(res => {
                            for (var i = 0; i < res.data.flavor_text_entries.length; i++) {
                                if (res.data.flavor_text_entries[i].language.name == 'en') {
                                    this.pokemonInfo.description = res.data.flavor_text_entries[i].flavor_text
                                    break
                                }
                            }
                        })
                        .catch(err => console.log(err))
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

#mainview {
    height: 150px;
}

</style>