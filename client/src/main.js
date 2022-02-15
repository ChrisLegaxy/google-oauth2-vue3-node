import { createApp } from 'vue'
import App from './App.vue'

import gAuthPlugin from "vue3-google-oauth2"
import "./index.css"

const app = createApp(App)

app.use(gAuthPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})
app.mount("#app")
