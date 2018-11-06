import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'




Vue.use(VueResource);
Vue.config.productionTip = false;

Vue.http.interceptors.push((request, next) => {
  if(localStorage.getItem('session') != null) {
      request.headers.set('session', localStorage.getItem('session'));}
      next();
});

export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

