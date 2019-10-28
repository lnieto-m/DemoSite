<template>
    <div>
        <h1>Pokedex</h1>
        <ScrollList></ScrollList>
        <PokemonMainVue></PokemonMainVue>
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
    }
        
}
</script>

<style scoped>

</style>