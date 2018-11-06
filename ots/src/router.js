import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
      {
        path: '/',
          name: 'login',
          component: () => import(/* webpackChunkName: "about" */ './views/LogIn.vue')
      },
      {
          path: '/registration',
          name: 'registration',
          component: () => import('./views/Registration.vue')
      },
      {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/Dashboard.vue')
      },
      {
          path: '/gamelist',
          name: 'gamelist',
          component: () => import('./views/GameList.vue')
      }

  ]
})
