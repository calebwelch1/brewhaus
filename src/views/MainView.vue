<script lang="ts">
import api from '../../api/punk-api.js'

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
    {{this.beers}}
  </main>
</template>

<style lang="scss">
body{
  height: 100%;
  max-height: 100vh;
  background: #fff;
  border: 1px solid blue;
  overflow: hidden;
  width:100%;
  max-width: 100%;
  margin: 0;
}
html {
  height: 100%;
  max-height: 100vh;
  background: #fff;
  border: 1px solid red;
  overflow: hidden;
  width:100%;
  max-width: 100%;
}
</style>

