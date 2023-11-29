<script lang="ts">
import api from '../../api/punk-api.js'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

/*
TODO:
FRONTEND:
----ARIA
-----use proper html structure
-----alt text

----MOBILE
----ITEM MODAL
----PAGINATION

BACKEND:
----LAZY LOADING
----ADD TO CART
----SEARCH/FILTER
-----abv <5<

*/

export default {
  setup() {
    const windowWidth = ref(window.innerWidth);
    const beers = ref([]);
    const filters = ['ABV<5', 'ABV>5', 'IBU<50', 'IBU>50', 'EBC<27', 'EBC>27'];
    const filter = ref('');
    const loading = ref(false)

    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    const getBeers = async () => {
      const data = await api.getBeers();
      beers.value = data;
    };

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    onMounted(getBeers);

    watch(filter, async (newFilter, oldFilter) => {
    if (newFilter != '') {
    loading.value = true
    try {
      const data = await api.getBeerByFilter(filter);
      beers.value = data;
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
  })

    return {
      windowWidth,
      beers,
      filters,
      filter,
    };
  },
};

</script>

<template>
  <main>
    <div class="main">
      <div class="header">
        <h1 style="margin: auto; font-size: 8rem; ">
          BREWHAUS
        </h1>
        <div style="display: flex; flex-direction: row;">
        <input type="text" style="width: 70vw; flex: 70; height: 1.5rem;"/>
        <!-- <div id="filter" style="flex: 20; cursor: pointer; width: 4rem; margin: auto;">Filter</div> -->
        <div class="filter-container">
        <select v-model="filter" class="filter-select">
            <option value="">Select an option</option>
            <option v-for="(option, index) in filters" :value="option" @click="(option)=>console.log(option)">{{option}}</option>
        </select>
        <div class="filter-arrow">&#9660;</div>
    </div>
        </div>
      </div>
      <div class="main-container">
        <div
        class="beer-card"
        v-for="(beer, index) in beers"
        >
        <img class="beer-card-image" :src="beer.image_url" :alt="`${beer.name}`"/>
        <p>{{beer.name}}</p>
        <p>ABV:{{beer.abv}}</p>
        <p>{{beer.tagline}}</p>
        <p>{{beer.description}}</p>
        </div>
      </div>
    </div>
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
width: 100%;
height: 100%;
flex: 15;
display: flex;
flex-direction: column;
}

.main-container {
  width: 100%;
  height: 100%;
  background: #Cbcbcb;
  flex: 85;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
  &-image{
  width: 100%;
  height: 100%;
  max-height: 11rem;
  max-width: 5rem;
  }
}

//filter


.filter-container {
    position: relative;
    display: inline-block;
}

.filter-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
}

        .filter-arrow {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            pointer-events: none;
        }

        /* Style the dropdown list */
        .filter-options {
            display: none;
            position: absolute;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            max-height: 150px;
            overflow-y: auto;
            z-index: 1;
        }

        .filter-option {
            padding: 10px;
            cursor: pointer;
        }

        .filter-option:hover {
            background-color: #f0f0f0;
        }

        /* Show the dropdown when the select is clicked */
        .filter-select:focus + .filter-options {
            display: block;
        }
</style>

