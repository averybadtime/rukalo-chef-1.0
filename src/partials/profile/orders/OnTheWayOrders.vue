<template>
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <div v-if="OnTheWayOrders.length > 0" class="dashboard-list-box margin-top-0">
        <h4>Órdenes en camino</h4>
        <ul>
          <p v-for="order in OnTheWayOrders" :key="order.key">
            {{ order }}
          </p>
        </ul>
      </div>
      <p v-else>
        No hay órdenes en camino.
      </p>
    </div>
  </div>
</template>
<script>
  import { DB } from "@/firebase"
  export default {
    created() {
      this.loadOnTheWayOrders()
    },
    data() {
      return {
        OnTheWayOrders: []
      }
    },
    methods: {
      loadOnTheWayOrders() {
        DB.ref("/orders").orderByChild("status").equalTo("onTheWay").on("value", snapshot => {
          snapshot.forEach(x => {
            this.OnTheWayOrders.push({
              key: snapshot.key,
              data: snapshot.val()
            })
          })
        })
      }
    }
  }
</script>