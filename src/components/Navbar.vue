<template>
  <div>
    <nav>
      <router-link class="spacing" v-for="routes in links" v-bind:key="routes.id" :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {id: 0, text: 'Home', page: '/'},
        {id: 1, text: 'Pokedex', page: '/pokedex'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spacing {
    margin-right: 10px;
  }
</style>
