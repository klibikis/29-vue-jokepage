<script setup lang="ts">
  defineProps<{
    joke: Joke
    buttonColor: string
    text: string
}>()
</script>

<template>
  <div class="jokes-wrapper">
    <div class="joke">
      <div class="joke-content">
        <p>
          {{ joke.joke }}
        </p>
      </div>
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

.joke{
  width: 95%;
  min-height: 250px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-image: url('../assets/joke-background.jpg');
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  color: white;
  overflow: hidden;
}
.joke-content{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 30px;
  width: 60%;
  box-shadow: 0 0 30px -1px black;
  background-color: rgba(0, 0, 0, 0.604);
  height: 100%;

}
.button-add{
  width: 100%;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  opacity: 70%;
  transition: all 0.2s ease-in;;
}
.button-add:hover{
  opacity: 100%;
  box-shadow: 0 0 10px aquamarine;
}

</style>
