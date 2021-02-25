import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-select/dist/vue-select.css';

import books from './data/books.json';
import './registerServiceWorker'



Vue.config.productionTip = false;

Vue.prototype.$books = books;
//Vue.prototype.$bible = bible;
Vue.component('v-select', vSelect);


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
