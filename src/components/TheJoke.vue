<script setup lang="ts">
  defineProps<{
    jokes: Joke[]
    buttonColor: string
    text: string
}>()
</script>

<template>
  <div class="jokes-wrapper">
    <div class="joke" v-for="(joke, index) in jokes" :key="index">
      <p class="joke-content">
        {{ joke.joke }}
      </p>
    <button 
      class="button-add"
      :style="{backgroundColor: buttonColor}"
      @click="$emit('handleClick', joke.id, joke.category, joke.joke)"
    >  
      {{ text }}</button>
    </div>
  </div>
  
</template>

<script lang="ts">
  export declare type Joke = {
    category: string,
    id: number,
    joke: string
  }

  export default {
    data() {
      return {
      }
    },
    methods: {
      handleClick() {
      this.$emit('handleClick')
    }
    }
  }
</script>

<style scoped>
.jokes-wrapper{
  padding: 30px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.joke{
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(14, 93, 93);
  border-radius: 5px;
  color: white;
  overflow: hidden;
}
.joke-content{
  padding: 10px;
  width: 90%;
}
.button-add{
  width: 10%;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}
.button-add:hover{
  opacity: 60%;
  box-shadow: 0 0 10px aquamarine;
}

</style>
