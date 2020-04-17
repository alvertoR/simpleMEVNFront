import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios,axios);

//Url base de la Api

axios.defaults.baseURL = 'http://localhost:3000/api';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
