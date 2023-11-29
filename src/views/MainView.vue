<script lang="ts">
import api from '../../api/punk-api.js'

/*
TODO:
FRONTEND:
----ARIA
-----use proper html structure
-----alt text

----MOBILE
----ITEM MODAL

BACKEND:
----LAZY LOADING
----ADD TO CART
----SEARCH/FILTER

*/

export default {
  data() {
    return { 
      windowWidth: window.innerWidth,
      beers: [],
     }
  },
  mounted() {
    this.getBeers();
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {  
    onResize() {
      this.windowWidth = window.innerWidth
    },
    async getBeers() {
      const data = await api.getBeers();
      this.beers = data;
    },
  },
  };
</script>

<template>
  <main>
    <div class="main">
      <div class="header">
        <input type="text" style="width: 70vw;"/>
      </div>
      <div class="main-container">
        <div
        class="beer-card"
        v-for="(beer, index) in beers"
        >
        <img :src="beer.image_url" />
        {{beer.name}}
        {{beer.abv}}
        {{beer.tagline}}
        {{beer.description}}
        </div>
      </div>
    </div>
    {{this.beers}}
  </main>
</template>

<style lang="scss">
body{
  height: 100%;
  max-height: 100vh;
  background: #fff;
  overflow: hidden;
  width:100%;
  max-width: 100%;
  margin: 0;
}
html {
  height: 100%;
  max-height: 100vh;
  background: #fff;
  overflow: hidden;
  width:100%;
  max-width: 100%;
}

.main {
  height: 100%;
  max-height: 100vh;
  width:100%;
  max-width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
}

.header {
background: green;
width: 100%;
height: 100%;
flex: 15;
}

.main-container {
  width: 100%;
  height: 100%;
  background: #fff;
  flex: 85;
  overflow-y: scroll;
}

.beer-card {
  height: 22rem;
  width: 18rem;
  display: flex;
  flex-direction: column;
  border: 0.5px solid blue;
  background: #fff;
  color: black;
  border-radius: 1rem;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}
</style>

