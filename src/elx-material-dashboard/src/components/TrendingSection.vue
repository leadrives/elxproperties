<template>
    <section class="trending">
      <div class="container-fluid">
        <div class="row pe-3 pe-lg-0 ps-3 px-lg-5">
          <div class="col-12 col-md-4 d-flex align-items-center">
            <div class="col m-center">
              <h2 class="my-3 my-lg-4">Trending</h2>
              <p>
                Discover the homes that are capturing attention in the market.
                This curated selection showcases the most sought-after properties
                available right now.
              </p>
              <button class="btn py-2 btn black-btn my-3 my-lg-4">See all</button>
            </div>
          </div>
          <div class="col-12 col-md-8">
            <div class="owl-carousel wol-custom-left-css owl-carousel2 owl-theme itm-owls position-static">
              <div v-for="property in trendingProperties" :key="property.title" class="item pb-3">
                <div class="col">
                  <a :href="property.link">
                    <div class="listing-itm-type-1">
                      <div class="card shadow-none bg-transparent card-villa card-slide position-relative">
                        <div class="card-body p-0">
                          <img :src="property.image" class="img-fluid" alt="" />
                          <h2 class="mt-3">{{ property.price }}</h2>
                          <p>{{ property.description }}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { db } from '@/firebase.js';
  import { collection, getDocs } from 'firebase/firestore';
  
  export default {
    data() {  
      return {
        trendingProperties: [],
      };
    },
    async created() {
      const querySnapshot = await getDocs(collection(db, 'trendingProperties'));
      querySnapshot.forEach((doc) => {
        this.trendingProperties.push(doc.data());
      });
    },
  };
  </script>
  