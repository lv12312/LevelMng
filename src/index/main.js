// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import N3Components from 'N3-components'
Vue.use(VueRouter)

// create router
const router = new VueRouter({
  history: true,
  linkActiveClass: 'active',
  saveScrollPosition: true
})
N3Components.install(Vue)
const App = Vue.extend(require('./App.vue'))

router.start(App, '#app')
