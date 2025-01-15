import './assets/main.scss';

import {createApp} from 'vue';
import {createPinia} from 'pinia';

import MyCheckbox from '@/components/ui/MyCheckbox.vue';
import MyInput from '@/components/ui/MyInput.vue';
import MyToast from '@/components/ui/MyToast.vue';

import App from './App.vue';
import router from './router';

import noty from '@/plugins/noty.js'

const app = createApp(App);

app
  .component('MyCheckbox', MyCheckbox)
  .component('MyInput', MyInput)

app.use(createPinia());
app.use(router);
app.use(noty);
app.mount('#app');

