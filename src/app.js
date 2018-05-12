import Vue from 'vue';
import VueApp from './app.vue';

const app = new Vue({
  el: '#app',
  render: h => h(VueApp),
});

export default app;
