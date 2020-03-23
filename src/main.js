import Vue from 'vue';
import App from './App';
import router from './router';
import './ui.js'
import '../static/css/common.less'

import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});


