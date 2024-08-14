<template>
  <v-container class="featured-sec pt-4 pt-lg-5 pb-4 pb-lg-5">
    <v-row>
      <v-col cols="12">
        <h2 class="mb-3 mb-lg-4">Featured Categories</h2>
      </v-col>
      <v-col v-for="category in categories" :key="category.title" cols="12" md="3" class="mb-3">
        <v-card class="text-white rounded-3 background-transperant position-relative">
          <v-img :src="category.image" class="card-img" alt="...">
            <v-card-text class="position-absolute title-sec">
              <h5 class="card-title mb-0 uppercase">{{ category.title }}</h5>
              <p>{{ category.listings }} Listings</p>
            </v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { title: 'Apartments', listings: 400, image: 'images/featured1.jpg' },
        { title: 'Penthouses', listings: 456, image: 'images/featured2.jpg' },
        { title: 'Townhouses', listings: 342, image: 'images/featured3.jpg' },
        { title: 'Villas', listings: 345, image: 'images/featured4.jpg' },
      ],
    };
  },
};
</script>

<style scoped>
.title-sec {
  bottom: 10px;
  left: 10px;
}

.uppercase {
  text-transform: uppercase;
}

.v-card {
  box-shadow: none;
  background: transparent;
}

.v-img {
  border-radius: 12px;
}
</style>
