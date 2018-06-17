<template>
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <div v-if="deliveredOrders.length > 0" class="dashboard-list-box margin-top-0">
        <h4>Órdenes activas</h4>
        <ul>
          <p v-for="order in deliveredOrders" :key="order.key">
            {{ order }}
          </p>
        </ul>
      </div>
      <p v-else>
        No hay órdenes entregadas.
      </p>
    </div>
  </div>
</template>
<script>
  import { DB } from "@/firebase"
  export default {
    created() {
      this.loadDeliveredOrders()
    },
    data() {
      return {
        deliveredOrders: []
      }
    },
    methods: {
      loadDeliveredOrders() {
        DB.ref("/orders").orderByChild("status").equalTo("delivered").on("value", snapshot => {
          snapshot.forEach(x => {
            this.deliveredOrders.push({
              key: snapshot.key,
              data: snapshot.val()
            })
          })
        })
      }
    }
  }
</script>