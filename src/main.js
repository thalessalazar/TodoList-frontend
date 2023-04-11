import Vue from 'vue'
import App from './App.vue';

import router from './router';
import store from '@/store';
import './plugins/vee-validate';
import './plugins/axios';
import './assets/css/tailwind.css';

import Vuesax from "vuesax";
import 'vuesax/dist/vuesax.css';

Vue.use(Vuesax);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
