<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  
  <section class="section-navbar">
    <nav class="navbar navbar-static-top nav-wrapper">
      <RouterLink to="/" class="routerLink">Browse Jokes</RouterLink>
      <RouterLink to="/favourites" class="routerLink">Favourite Jokes</RouterLink>
    </nav>
  </section>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
  .app-wrapper{
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .nav-wrapper{
    width: 80%;
    display: flex;
    padding: 0 50px;
    margin: 0;
  }
  .routerLink{
    color: white;
    text-decoration: none;
    font-size: 20px;
    padding: 20px;
  }
  .routerLink:hover{
    background-color: rgba(255, 255, 255, 0.295);;
  }
  .router-link-active{
    background-color: rgba(255, 255, 255, 0.295);
  }
  .section-navbar{
    display: flex;
    justify-content: center;
    background-color: black;
  }

</style>
