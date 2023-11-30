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
    const currentPage: number = ref(1);
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
      // lazy loader observer
    //   const options = {
    //   root: null,
    //   rootMargin: '0px',
    //   threshold: 0.1, // Trigger when 10% of the target element is visible
    // };
    // this.observer = new IntersectionObserver(this.handleIntersection, options);
    // this.observeTarget(); // Start observing
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    // const loadingFunction = () => {
    //   setTimeout(function(){
    //     console.log('start of timeout')
    // // $("#loading").css("display","flex");
    // const loader = document.getElementById('loading');
    //   loader!.style.display = "flex";
    // setTimeout(function(){
    //   // $("#loading").css("display","none");
    //   const loader = document.getElementById('loading');
    //   loader!.style.display = "none";
    // },700);
    // },1200);
    // console.log('end of timeout')
    // };

    onMounted(getBeers);

  //   watch(loading, async (oldLoading, newLoading) => {
  //   if (loading.value = true) {
  //     loadingFunction();
  //   }
  // })

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
      const modal = document.getElementById('modal');
      modal!.style.display = "flex";
    },
    closeModal(){
      // this.currentBeer.value = {}
      const modal = document.getElementById('modal');
      modal!.style.display = "none";
    },
  },
};

</script>

<template>
  <main>
    <div class="main">
      <!-- <div id="loading">
        <div id="spinner"></div>
      </div> -->
      <div class="header">
        <h1 style="margin: auto; font-size: 8rem; ">
          BREWHAUS
        </h1>
        <div style="display: flex; flex-direction: row;">
        <input type="text" v-model="search" style="width: 70vw; flex: 70; height: 1.5rem;"/>
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
        <ItemModal :beer="currentBeer.value" v-if="Object.keys(currentBeer).length != 0" @close="closeModal"/>
        <div class="beer-cards">
        <div
        class="beer-card tan"
        v-for="(beer, index) in beers"
        @click="openModal(beer)"
        >
        <div class="info-button blue">
        <p style="font-size: 18px; color: white;"> i </p>
        </div>
        <div class="beer-card-background orange">
        </div>
        <p class="beer-abv">ABV: {{ beer.abv }}</p>
        <p class="beer-ph">IBU: {{ beer.ibu }}</p>
        <div  class="beer-title" style="overflow-x: hidden;">
        <h3>{{beer.name}}</h3>
        </div>
        <div class="beer-image" :style="beer.image_url.includes('keg') ? 'left:40%' : 'left: 45%'">
          <img :src="beer.image_url" :alt="`${beer.name}`"/>
        </div>
        <div class="beer-info">
        <!-- <p class="beer-name">{{ beer.name }}</p> -->
        <!-- <p class="beer-tagline">{{ beer.tagline }}</p> -->
      </div>
        </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
// palette
.blue {
  background-color: #003049 !important;
}
.red {
  background-color: #d62828 !important;
}
.orange {
  background-color: #f77f00 !important;
}
.yellow {
  background-color: #fcbf49 !important;
}
.tan {
  background-color: #eae2b7 !important;
}
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
background: rgb(247,127,0);
background: linear-gradient(0deg, rgba(247,127,0,1) 0%, rgba(234,226,183,1) 100%);
}

.main-container {
  width: 100%;
  height: 85vh;
  // background: #Cbcbcb;
  overflow-y: scroll;
  display: block;
  position: relative;
  &-flex{
  flex: 85;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 0;
  }
}

// .beer-card {
//   height: 22rem;
//   width: 18rem;
//   display: flex;
//   flex-direction: column;
//   border: 0.5px solid blue;
//   background: #fff;
//   color: black;
//   border-radius: 1rem;
//   filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
//   cursor:pointer;
//   &-image{
//   width: 100%;
//   height: 100%;
//   max-height: 11rem;
//   max-width: 5rem;
//   }
// }

.info-button {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 25px;
  height: 25px;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 25;
}

.beer-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 3rem;
}

.beer-abv {
  font-size: 28px;
  position: absolute;
  top: 20%;
  left: 10%;
}

.beer-ph {
  font-size: 28px;
  position: absolute;
  top: 20%;
  right: 10%;
}

@media (max-width: 1350px) {
  .beer-abv {
  font-size: 28px;
  position: absolute;
  top: 20%;
  left: 10%;
  display: none !important;
}

.beer-ph {
  font-size: 28px;
  position: absolute;
  top: 20%;
  left: 10%;
  display: none !important;
}
}


//mobile
@media (max-width: 768px) {
  .beer-cards {
    flex-direction: column;
    align-items: center;
    margin: 1rem;
  }

  .beer-card {
  width: 70% !important;
  height: 22rem;
  display: flex;
  flex-direction: column;
  border: 0.5px solid blue;
  background: #fff;
  color: black;
  border-radius: 1rem;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
}

.beer-card-background {
  height: 45%;
  width: 100%;
  position:absolute;
  bottom: 0;
  z-index: 10;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
}

.beer-card {
  width: calc(29.33% - 16px);
  height: 22rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: black;
  border-radius: 1rem;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;
}

.beer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.beer-image {
  max-height: 15rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4%;
  z-index: 25;
  // left: 45%;
}

.beer-title {
  height: auto;
  // width: auto;
  width: 24rem;
  white-space: nowrap;
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -5%;
  z-index: 25;
  left: 50%; /* Set to the center of the parent container */
  transform: translateX(-48%);
  color: #fff;
}

.beer-image img {
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
}

.beer-info {
  padding: 16px;
  flex: 1;
}

.beer-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.beer-tagline {
  font-size: 14px;
  margin-bottom: 8px;
}

.beer-description {
  font-size: 14px;
}

#loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background:rgba(255, 255, 255, 0.7);
    z-index: 999;
    // display: flex;
    display: none;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
#spinner {
    animation: rotate 0.56s infinite linear;
    width:50px;
    height:50px;
    border:12px solid #fff;
    border-bottom:12px solid rgb(255, 50, 50);
    border-radius:50%;
    margin-left:50%;
    margin-top: 30%;
    position: fixed;

}
@keyframes rotate {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
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

