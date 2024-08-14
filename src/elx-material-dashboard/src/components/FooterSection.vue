<template>
    <v-footer padless>
      <v-container>
        <v-row>
          <v-col class="text-center" cols="12">
            <v-img src="images/foot-logo.svg" class="my-4 foot-logo" alt="Footer Logo"></v-img>
          </v-col>
          <v-col cols="12" lg="9">
            <v-row>
              <!-- Add your footer content here -->
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <hr class="mt-3 mt-lg-4" />
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .foot-logo {
    max-width: 200px;
  }
  
  hr {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  </style>
  