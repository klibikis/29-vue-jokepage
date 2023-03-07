<script setup lang="ts">
  import TheJoke from '@/components/TheJoke.vue';
  import axios from 'axios'
  import type { Joke } from '@/components/TheJoke.vue';
  import { useToast } from "vue-toastification";

</script>

<template>
<TheJoke 
    :jokes="jokes" 
    button-color="#ff615d" 
    @handleClick="(id) => {deleteJokeFromFavourites(id)}"
    text="Remove from favourites"
  />
</template>

<script lang="ts">

const toast = useToast();

export default {

  data: () => ({
    jokes: [] as Joke[]
  }),

  created() {
    // fetch on init
    this.fetchJokes()
  },
  methods: {

    fetchJokes() {
      axios.get('http://localhost:3006/jokes').then(({data}) => {
        if(!data){
          return
        }
        this.jokes = data
      })
    },

    deleteJokeFromFavourites(id: number) {
      axios.delete('http://localhost:3006/jokes/delete/' + id).then((res) => {
        this.jokes = this.jokes.filter((joke) => {
          return joke.id !== id
        })
        toast.success("Joke removed from favourites", {
            timeout: 3000
          });
      })
    }
  }
}
</script>
