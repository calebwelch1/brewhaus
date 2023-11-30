<script lang="ts">
import api from '../../api/punk-api.js'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import ItemModal from '../components/ItemModal.vue';

/*
TODO:
FRONTEND:
----ARIA
-----use proper html structure
-----alt text - x

----MOBILE - 
----ITEM MODAL - 
----PAGINATION - 

BACKEND:
----LAZY LOADING -
----ADD TO CART -
----SEARCH/FILTER -
*/

export default {
  components: {
    ItemModal,
  },
  setup() {
    const windowWidth = ref(window.innerWidth);
    const beers = ref([]);
    const filters: String[] = ['ABV<5', 'ABV>5', 'IBU<50', 'IBU>50', 'EBC<27', 'EBC>27'];
    const filter: String = ref('');
    const search: String = ref('');
    const loading: Boolean = ref(false)
    const currentBeer = ref({})

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
      // console.log('filter watch called')
    if (newFilter === '') getBeers();
    else {
    loading.value = true
    try {
      let data;
      if (search.value === ''){
       data = await api.getBeerByFilter(filter.value);
      }
      else {
        data = await api.getBeerBySearch(search.value, filter.value)
      }
      beers.value = data;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  }
  })

  watch(search, async (newSearch, oldSearch) => {
    if (newSearch === '') getBeers();
    else {
    loading.value = true
    try {
      let data;
      if( filter.value === '') {
      data = await api.getBeerBySearch(search.value);
      }
      else {
        data = await api.getBeerBySearch(search.value, filter.value);
      }
      beers.value = data;
    } catch (error) {
      console.log(error)
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
      search,
      loading,
      currentBeer,
    };
  },
  methods: {
    openModal(beer) {
      this.currentBeer.value = beer;
    },
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
        <ItemModal :beer="currentBeer.value" v-if="Object.keys(currentBeer).length != 0"/>
        <div style="display: flex; flex-direction: row;">
        <input type="text" v-model="search" style="width: 70vw; flex: 70; height: 1.5rem;"/>
        <!-- <div id="filter" style="flex: 20; cursor: pointer; width: 4rem; margin: auto;">Filter</div> -->
        <div class="filter-container">
        <select v-model="filter" class="filter-select">
            <option value="">Select an option</option>
            <option v-for="(option, index) in filters" :value="option">{{option}}</option>
        </select>
        <div class="filter-arrow">&#9660;</div>
    </div>
        </div>
      </div>
      <div class="main-container">
        <div class="main-container-flex">
          <div
        class="beer-card"
        v-for="(beer, index) in beers"
        @click="openModal(beer)"
        >
        <img class="beer-card-image" :src="beer.image_url" :alt="`${beer.name}`"/>
        <p>{{beer.name}}</p>
        <p>ABV:{{beer.abv}}</p>
        <p>{{beer.tagline}}</p>
        <p>{{beer.description}}</p>
        </div>
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
  height: 85vh;
  background: #Cbcbcb;
  overflow-y: scroll;
  display: block;
  &-flex{
  flex: 85;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 0;
  }
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

        .filter-select:focus + .filter-options {
            display: block;
        }
</style>

