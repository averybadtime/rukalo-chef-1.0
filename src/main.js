import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router"
import { Routes } from "./routes"

Vue.use(VueRouter)

const Router = new VueRouter({
	mode: "history",
	routes: Routes
})

new Vue({
  el: '#app',
  router: Router,
  render: h => h(App)
})
