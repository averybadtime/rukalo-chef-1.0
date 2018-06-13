import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router"
import { Routes } from "./routes"
import { Store } from "./store"
import { AUTH, DB } from "./firebase"

Vue.use(VueRouter)

const Router = new VueRouter({
	mode: "history",
	routes: Routes
})

let app

function checkIfUsersExistsInNode() {

}

function loadAuthUserInfo (uid) {
  return new Promise(resolve => {
    if (!uid) resolve()

    const refs = ["/users/", "/chefs/", "/admins/"]
    refs.forEach(ref => {
      DB.ref(ref + uid).child("info").once("value", snapshot => {
        if (snapshot.exists()) {
          Store.state.user = snapshot.val()
          resolve()
        }
      })
    })
  })
}

AUTH.onAuthStateChanged(user => {
  Store.state.firebaseUser = user

  const userId = user ? user.uid : null

  loadAuthUserInfo(userId).then(() => {
    if (!app) {
      new Vue({
        el: '#app',
        router: Router,
        store: Store,
        render: h => h(App)
      })
    }
  })

})
