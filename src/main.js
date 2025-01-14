import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import MyCheckbox from '@/components/ui/MyCheckbox.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('MyCheckbox', MyCheckbox)

app.use(createPinia())
app.use(router)

app.mount('#app')
