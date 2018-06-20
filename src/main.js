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

    var authUserCallback

    const refs = ["/users/chefs/", "/users/users/", "/users/admins/"]
    // refs.forEach(ref => {
    //   authUserCallback = DB.ref(ref + uid).child("profileInfo").once("value", snapshot => {
    //     if (snapshot.exists()) {
    //       Store.state.user = snapshot.val()
    //       console.log(snapshot.ref.toString())
    //       return resolve(snapshot.ref.path)
    //     }
    //     console.log(ref)
    //   })
    // })
    for (let i in refs) {
      DB.ref(refs[i] + uid).child("profileInfo").once("value", snapshot => {
        if (snapshot.exists()) {
          Store.state.user = snapshot.val()
          return resolve(snapshot.ref.path.pieces_)
        }
      })
    }
  })
}

AUTH.onAuthStateChanged(user => {
  Store.state.firebaseUser = user

  const userId = user ? user.uid : null

  loadAuthUserInfo(userId).then((x) => {

    let authUserRef = ""

    x.forEach(c => authUserRef += "/" + c)

    DB.ref(authUserRef).on("value", snapshot => {
      Store.state.user = snapshot.val()
    })
    
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
