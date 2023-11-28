<script lang="ts">

export default {
  data() {
    return { 
      windowWidth: window.innerWidth,
     }
  },
  mounted() {
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {  
    onResize() {
      this.windowWidth = window.innerWidth
    },
  },
  };
</script>

<template>
  <main>
    working
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

