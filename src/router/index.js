import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '@/components/Pages/Homepage'
import Pokedex from '@/components/Pages/Pokedex'

Vue.use(Router)

export default new Router ({
    routes: [
        {path: '/', name: 'Homepage', component: Homepage},
        {path: '/pokedex', name: 'Pokedex', component: Pokedex}
    ]
})