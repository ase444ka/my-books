import './assets/main.scss';

import {createApp} from 'vue';

import MyCheckbox from '@/components/ui/MyCheckbox.vue';
import MyInput from '@/components/ui/MyInput.vue';
import MyButton from '@/components/ui/MyButton.vue';

import App from './App.vue';

import noty from '@/plugins/noty.js'

const app = createApp(App);

app
  .component('MyCheckbox', MyCheckbox)
  .component('MyInput', MyInput)
  .component('MyButton', MyButton)

app.use(noty);
app.mount('#app');

