<template>
  <v-app>
    <NavigationMenu />
    <v-main>
      <v-container>
        <FeaturedCategories />
        <TrendingSection />
      </v-container>
    </v-main>
    <FooterSection />
  </v-app>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue';
import FeaturedCategories from './components/FeaturedCategories.vue';
import TrendingSection from './components/TrendingSection.vue';
import FooterSection from './components/FooterSection.vue';

export default {
  components: {
    NavigationMenu,
    FeaturedCategories,
    TrendingSection,
    FooterSection,
  },
};
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  background: #fff;
}
</style>
