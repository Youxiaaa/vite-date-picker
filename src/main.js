import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'

import aos from 'aos'
import 'aos/dist/aos.css'
export const AOS = {
  install: () => new (aos).init()
}

const app = createApp(App)

app
.use(AOS)
.mount('#app')
