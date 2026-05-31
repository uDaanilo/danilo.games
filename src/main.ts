import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './app/i18n'

import '98.css'
import './app/styles/main.css'

const app = createApp(App)

app.use(router).use(i18n)

app.mount('#app')
