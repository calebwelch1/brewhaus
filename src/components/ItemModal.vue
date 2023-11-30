<script lang='ts'>
import { ref } from 'vue'

export default {
  props: {
    beer: null,
  },
  emits: ['close'],
  setup(props) {
    const beer = ref({})
  }
}
</script>

<template>
  <Transition name="modal-fade">
    <div id="modal" class="item-card">
      <p style="position: absolute; top: 3; right:30px; z-index: 101; cursor: pointer; font-size: 3.5rem;" @click="$emit('close')">X </p>
      <div style="flex:30; height: 100%;">
        <div class="gradient-background" style="border: 1px solid blue; border-radius: 1rem; height: 100%; width: 100%; max-height: 80%; max-width: 70%; margin-top: 10%; margin-left: 10%; ">
        <img :src="beer.image_url" style="margin:auto; height: 100%; width: 100%; max-height: 80%; max-width: 60%; margin-left: 20%;margin-top: 5rem; margin-bottom: 5rem;"/>
        </div>
      </div>
      <div style="flex:70; display: flex; flex-direction:column; margin-right: 5rem;margin-top: 5rem; margin-bottom: 5rem;">
        <h2 class="beer-name">{{ beer.name }}</h2>
    <div class="beer-details">
      <div class="beer-detail">
        <span class="detail-label">ABV:</span>
        <span class="detail-value">{{ beer.abv }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">Attenuation Level:</span>
        <span class="detail-value">{{ beer.attenuation_level }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">Boil Volume:</span>
        <span class="detail-value">{{ beer.boil_volume.value }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">Brewer's Tips:</span>
        <span class="detail-value">{{ beer.brewers_tips }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">Description:</span>
        <span class="detail-value">{{ beer.description }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">First Brewed:</span>
        <span class="detail-value">{{ beer.first_brewed }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">Food Pairing:</span>
        <span class="detail-value">{{ beer.food_pairing }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">IBU:</span>
        <span class="detail-value">{{ beer.ibu }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">pH:</span>
        <span class="detail-value">{{ beer.ph }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">SRM:</span>
        <span class="detail-value">{{ beer.srm }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">Tagline:</span>
        <span class="detail-value">{{ beer.tagline }}</span>
      </div>
      <div class="beer-detail">
        <span class="detail-label">Volume:</span>
        <span class="detail-value">{{ beer.volume.value }} {{ beer.volume.unit }}</span>
      </div>
      <div class="ingredients">
    <div class="ingredient-category">
      <h3>Malt</h3>
      <ul>
        <li v-for="(malt, index) in beer.ingredients.malt" :key="index">
          {{ malt.name }}: {{ malt.amount.value }} {{ malt.amount.unit }}
        </li>
      </ul>
    </div>
    <div class="ingredient-category">
      <h3>Hops</h3>
      <ul>
        <li v-for="(hop, index) in beer.ingredients.hops" :key="index">
          {{ hop.name }} ({{ hop.add }} - {{ hop.attribute }}): {{ hop.amount.value }} {{ hop.amount.unit }}
        </li>
      </ul>
    </div>
    <div class="ingredient-category">
      <h3>Yeast</h3>
      <p>{{ beer.ingredients.yeast }}</p>
    </div>
  </div>
    </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss">
.gradient-background {
background: linear-gradient(0deg, rgba(247,127,0,1) 0%, rgba(234,226,183,1) 100%);
}
.ingredients {
  display: flex;
  justify-content: space-between;
}

.ingredient-category {
  flex: 1;
  margin: 0 16px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
.item-card{
  height:100%;
  width: 100%;
  max-height: 70vh;
  max-width: 90vw;
  // background: #fff;
  border-radius: 1rem;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  position: absolute;
  z-index: 99;
  top: 0%;
  left: 5%;
  display:flex;
  flex-direction: row;
  position: relative;
}


.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.25s ease all;
}

.beer-name {
  font-size: 2.5rem !important;
  font-weight: bold;
  margin-bottom: 16px;
}

.beer-details {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  overflow-y: scroll;
}

.beer-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 20px;
}

.detail-label {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.detail-value {
  color: black;
}
</style>