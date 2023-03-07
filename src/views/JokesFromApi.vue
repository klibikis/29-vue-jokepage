<script setup lang="ts">
  import TheJoke from '@/components/TheJoke.vue';
  import axios from 'axios'
  import type { Joke } from '@/components/TheJoke.vue';
  import { useToast } from "vue-toastification";

</script>

<template>
  <div class="category-wrapper">
    <button @click="fetchJokesByCategory('Programming')">Programming</button>
    <button @click="fetchJokesByCategory('Dark')">Dark</button>
    <button @click="fetchJokesByCategory('Misc')">Misc</button>
    <button @click="fetchJokesByCategory('Pun')">Pun</button>
  </div>
  
  <TheJoke 
    :jokes="jokes" 
    button-color="#90EE90" 
    @handleClick="(id, category, joke) => {addJokeToFavourites({id, category, joke})}"
    text="Add to favourites"
  />
</template>

<script lang="ts">
  let API_URL = `https://v2.jokeapi.dev/joke/Programming?type=single&amount=10`
  const toast = useToast();
  
  export default {

  data: () => ({
    jokes: [] as Joke[],
  }),

  

  created() {
    // fetch on init
    this.fetch20Jokes()
  },
  methods: {

    fetch20Jokes() {
      const jokesPart1 = this.fetch10Jokes().then((res)=> {
      return res
      })
      const jokesPart2 = this.fetch10Jokes().then((res)=> {
        return res
      })

      Promise.all([jokesPart1, jokesPart2]).then((res)=> {
        this.jokes = [...res[0], ...res[1]];
      })
    },

    fetch10Jokes() {
      return axios.get(API_URL).then(({data}) => {
        if(!data){
          return
        }
        return data.jokes
      })
    },

    fetchJokesByCategory(category: string) {
      API_URL=`https://v2.jokeapi.dev/joke/${category}?type=single&amount=10`
      this.fetch20Jokes()
    },

    addJokeToFavourites({id, category, joke}: Joke) {
      axios.post('http://localhost:3006/jokes/new', {
        id,
        category,
        joke
      })
      .then((res)=> {
        if(res.status===200){
          toast.success("Joke added to favourites", {
            timeout: 3000
          });
        }
      })
      .catch((err) => {
        toast.warning(err.response.data.error, {
            timeout: 3000
          });
      })
    }
  }
}


</script>

<style>

.category-wrapper{
  width: 100%;
  display: flex;
  gap: 30px;
  justify-content: center;
}

</style>
