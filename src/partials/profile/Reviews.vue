<template>
  <div class="row">
    <div class="col-md-12">
      <h2>Mis reviews</h2>
      <ul v-if="reviews.length > 0">
        <li v-for="review in reviews" :key="review.key"><p>{{ review }}</p></li>
      </ul>
      <p v-else>No has hecho ninguna review.</p>
    </div>
  </div>
</template>
<script>
  import { DB } from "@/firebase"
  import { Store } from "@/store"
  export default {
    created() {
      this.getReviews()
    },
    data() {
      return {
        reviews: []
      }
    },
    methods: {
      getReviews() {
        this.reviews = []
        const uid = Store.state.firebaseUser.uid
        const reviewsRef = DB.ref("/users/users/" + uid + "/reviews")
        reviewsRef.on("value", snapshot => {
          if (snapshot !== null) {
            snapshot.forEach(a => {
              const key = a.key
              DB.ref("/reviews/" + key).on("value", b => {
                this.reviews.push({
                  key: b.key,
                  data: b.val()
                })
              })
            })
          }
        })
      }
    }
  }
</script>