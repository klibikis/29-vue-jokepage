import { createRouter, createWebHistory } from 'vue-router'
import FavouriteJokesVue from '../views/FavouriteJokes.vue'
import JokesFromApiVue from '../views/JokesFromApi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: JokesFromApiVue
    },
    {
      path: '/favourites',
      name: 'favourite jokes',
      component: FavouriteJokesVue
    }
  ]
})

export default router
