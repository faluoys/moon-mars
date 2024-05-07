import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import './assets/css/tailwind.css'
import router from "@/router";
import i18n from "@/locales";
import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
const app = createApp(App)
app.use(router).use(i18n)
app
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
