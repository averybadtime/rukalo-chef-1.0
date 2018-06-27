<template>
  <div class="row">
    <div class="col-md-12">
      <h1>Mis favoritos</h1>
      <p v-if="isLoadingFavorites">Obteniendo favoritos...</p>
      <template v-else>
        <ul v-if="favorites.length > 0">
          <li v-for="f in favorites" :key="f.key">{{ f }}</li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
  import { DB } from "@/firebase"
  export default {
    created() {
      this.getFavorites()
    },
    data() {
      return {
        isLoadingFavorites: true,
        favorites: [],
        favoritesRef: DB.ref("/users/users/" + this.$store.state.firebaseUser.uid + "/favorites"),
        onChildAdded: null,
        onChildRemoved: null
      }
    },
    methods: {
      getFavorites() {
        this.onChildAdded = this.favoritesRef.on("child_added", snapshot => {
          const chefId = snapshot.key
          DB.ref("/users/chefs/" + chefId + "/profile").once("value", chefProfileSnapshot => {
            this.favorites.push({
              key: chefId,
              data: chefProfileSnapshot.val()
            })
          })
          this.isLoadingFavorites = false
        })
        this.onChildRemoved = this.favoritesRef.on("child_removed", snapshot => {
          this.favorites = this.favorites.filter(x => snapshot.key !== x.key)
        })
      }
    },
    beforeDestroy() {
      this.favoritesRef.off("child_added", this.onChildAdded)
      this.favoritesRef.off("child_removed", this.onChildRemoved)
    }
  }
</script>