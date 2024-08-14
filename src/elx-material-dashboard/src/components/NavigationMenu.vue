<template>
  <v-app-bar app flat color="white">
    <v-container>
      <v-row align="center" justify="space-between">
        <!-- Hamburger Menu for Mobile -->
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

        <!-- Logo -->
        <v-col cols="auto">
          <v-img :src="logo" class="site-logo" alt="site-logo"></v-img>
        </v-col>

        <!-- Desktop Navigation Links -->
        <v-col class="d-none d-lg-flex" cols="auto">
          <v-row>
            <v-btn text v-for="(item, index) in navItems" :key="index" @click="toggleDropdown(item)">
              {{ item.title }}
            </v-btn>
          </v-row>
        </v-col>

        <!-- Action Buttons -->
        <v-col cols="auto" class="d-flex justify-content-end align-items-center">
          <v-btn color="primary" outlined class="me-4" @click="openModal">Sell your property</v-btn>
          <v-btn color="green" text>
            <v-icon left>mdi-whatsapp</v-icon> +971569124881
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      logo: require('@/assets/images/logo.svg'), // Adjust the path as needed
      navItems: [
        { title: 'UAE', isOpen: false, links: [] },
        { title: 'OFF-PLAN properties', isOpen: false, links: [] },
        { title: 'Resale', isOpen: false, links: [] },
        { title: 'Rent', isOpen: false, links: [] },
        { title: 'Contact us', isOpen: false, links: [] },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      // Logic to toggle the drawer
    },
    toggleDropdown(item) {
      item.isOpen = !item.isOpen;
    },
    openModal() {
      // Logic to open the modal
    },
  },
};
</script>

<style scoped>
.site-logo {
  width: 75px;
}

.v-app-bar {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.v-btn {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
}

.v-btn.me-4 {
  border-radius: 20px;
  padding: 10px 20px;
}

.v-btn.text {
  padding: 0;
  margin: 0 5px;
}

.v-icon {
  vertical-align: middle;
}

</style>
