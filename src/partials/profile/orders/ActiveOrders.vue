<template>
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <div v-if="activeOrders.length > 0" class="dashboard-list-box margin-top-0">
        <h4>Órdenes activas</h4>
        <ul>
          <p v-for="order in activeOrders" :key="order.key">
            {{ order }}
          </p>
        </ul>
      </div>
      <p v-else>
        No hay órdenes activas.
      </p>
    </div>
  </div>
</template>
<script>
  import { DB } from "@/firebase"
  export default {
    created() {
      this.loadActiveOrders()
    },
    data() {
      return {
        activeOrders: []
      }
    },
    methods: {
      loadActiveOrders() {
        DB.ref("/orders").orderByChild("status").equalTo("active").on("value", snapshot => {
          snapshot.forEach(x => {
            this.activeOrders.push({
              key: snapshot.key,
              data: snapshot.val()
            })
          })
        })
      }
    }
  }
</script>