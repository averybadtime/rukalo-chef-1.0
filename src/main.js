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

let app, onValue

function loadAuthUserInfo (uid) {
  return new Promise(resolve => {
    if (!uid) return resolve()

    const userRef = DB.ref("/users/users/" + uid)
    onValue = userRef.child("profileInfo").on("value", snapshot => {
      if (snapshot.exists()) return resolve(snapshot.val())
      else return resolve(null)
    })
  })
}

AUTH.onAuthStateChanged(user => {
  const uid = user ? user.uid : null
  loadAuthUserInfo(uid).then(data => {
    if (data) {
      if (data.role === "USER") {
        Store.state.firebaseUser = user
        Store.state.user = data
      } else {
        AUTH.signOut().then(() => console.log("Cerrando sesión..."))
        DB.ref("/users/users/" + uid + "/profileInfo").off("value", onValue)
      }
    } else {
      if (uid) DB.ref("/users/users/" + uid + "/profileInfo").off("value", onValue)
    }
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
