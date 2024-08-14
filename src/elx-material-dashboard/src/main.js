import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/css/style.css';  // Assuming the CSS is in the assets folder


loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
