import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router"
import { Routes } from "./routes"
import { Store } from "./store"

Vue.use(VueRouter)

const Router = new VueRouter({
	mode: "history",
	routes: Routes
})

new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: h => h(App)
})
