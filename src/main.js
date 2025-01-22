import './assets/main.scss';

import {createApp} from 'vue';
import { createPinia } from 'pinia'

import MyCheckbox from '@/components/ui/MyCheckbox.vue';
import MyInput from '@/components/ui/MyInput.vue';
import MyButton from '@/components/ui/MyButton.vue';

import App from './App.vue';

import noty from '@/plugins/noty.js'

const pinia = createPinia()
const app = createApp(App);

app.use(noty)
app.use(pinia);

app
  .component('MyCheckbox', MyCheckbox)
  .component('MyInput', MyInput)
  .component('MyButton', MyButton)


app.mount('#app');

