<script setup lang="ts">
  import TheJoke from '@/components/TheJoke.vue';
  import type { Joke } from '@/components/TheJoke.vue';
  import axios from 'axios'
  import { useToast } from "vue-toastification";
</script>

<template>
<div class="jokes-wrapper">
    <div class="jokes-sectionWrapper">
      <TheJoke 
        v-for="(joke, index) in jokes1" :key="index"
        :joke="joke" 
        button-color="#FA5F55" 
        @handleClick="(id) => {deleteJokeFromFavourites(id)}"
        text="DELETE"
      />
    </div>
    <div class="jokes-sectionWrapper pt-150">
      <TheJoke 
        v-for="(joke, index) in jokes2" :key="index"
        :joke="joke" 
        button-color="#FA5F55" 
        @handleClick="(id) => {deleteJokeFromFavourites(id)}"
        text="DELETE"
      />
    </div>
  </div>
</template>

<script lang="ts">

  const toast = useToast();

  export default {
    
    data: () => ({
      jokes: [] as Joke[],
      jokes1: [] as Joke[],
      jokes2: [] as Joke[]
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
          this.jokes1 = data.slice(0, Math.ceil(data.length/2))
          this.jokes2 = data.slice(Math.ceil(data.length/2))
        })
      },

      deleteJokeFromFavourites(id: number) {
        axios.delete('http://localhost:3006/jokes/delete/' + id).then(() => {
          this.jokes1 = this.jokes1.filter((joke) => {
            return joke.id !== id
          })
          this.jokes2 = this.jokes2.filter((joke) => {
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

<style>
.jokes-wrapper{
  display: flex;
}
.jokes-sectionWrapper{
  width: 50%;
  padding: 30px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.pt-150{
  padding-top: 150px;
}
</style>
