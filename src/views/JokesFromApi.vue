<script setup lang="ts">
  import TheJoke from '@/components/TheJoke.vue';
  import axios from 'axios'
  import type { Joke } from '@/components/TheJoke.vue';
  import { useToast } from "vue-toastification";

</script>

<template>
  <div class="category-wrapper">
    <div class="buttons-wrapper">
      <button v-for="(category, index) in categories" :key="index"
        class="btn-category" 
        @click="handleCategoryClick(category)"
        :class="{btnActive: activeCategory === category}"
        :disabled="activeCategory===category"
      >
        {{category}}
      </button>
    </div>
    <button 
      class="btn-reset"
      @click="fetchJokesByCategory(activeCategory)"
    >
      RELOAD JOKES
    </button>
  </div>
  
  <div class="jokes-wrapper">
    <div class="jokes-sectionWrapper">
      <TheJoke 
        v-for="(joke, index) in jokes1" :key="index"
        :joke="joke" 
        button-color="#90EE90" 
        @handleClick="(id, category, joke) => {addJokeToFavourites({id, category, joke})}"
        text="Add to favourites"
      />
    </div>
    <div class="jokes-sectionWrapper pt-150">
      <TheJoke 
        v-for="(joke, index) in jokes2" :key="index"
        :joke="joke" 
        button-color="#90EE90" 
        @handleClick="(id, category, joke) => {addJokeToFavourites({id, category, joke})}"
        text="Add to favourites"
      />
    </div>
  </div>

</template>

<script lang="ts">
  let API_URL = `https://v2.jokeapi.dev/joke/Programming?type=single&amount=10`
  const toast = useToast();
  
  export default {

  data: () => ({
    activeCategory: 'Programming',
    jokes1: [] as Joke[],
    jokes2: [] as Joke[],
    categories: ['Programming', 'Dark', 'Misc', 'Pun']
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
        this.jokes1 = res[0]
        this.jokes2 = res[1]
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

    makeCategoryActive(category: string) {
      this.activeCategory=category
    },

    handleCategoryClick(category: string) {
      this.fetchJokesByCategory(category)
      this.makeCategoryActive(category)
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

.category-wrapper{
  width: 100%;
  margin: 30px auto 0 auto;
  border-radius: 20px;
  color: white;
  display: flex;
  background-color: rgb(0, 0, 0);
  flex-direction: column;
  overflow: hidden;
}
.buttons-wrapper{
  display: flex;
  justify-content: center;
  border-bottom: 1px solid white;
}


.btn-category{
  padding: 20px 30px;
  width: 25%;
  background-color: transparent;
  border: none;
  color: white;
  font-weight: bold;
  transition: all 0.2s ease;
  background-color: rgb(0, 0, 0);
}
.btn-category:hover{
  background-color: rgb(254, 237, 197);
  color: black;
  cursor: pointer;
}
.btn-reset{
  width: 100%;
  border: none;
  padding: 7px 30px;
  background-color: rgb(254, 237, 197);
  transition: all 0.2s ease;
}
.btn-reset:hover{
  cursor: pointer;
  box-shadow: 0 0 40px -5px white;
  background-color: rgb(252, 241, 216);

}
.btnActive{
  background-color: rgb(254, 237, 197);
  color: black;
}
.pt-150{
  padding-top: 150px;
}


</style>
