<template>
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <div v-if="pendingOrders.length > 0" class="dashboard-list-box margin-top-0">
        <h4>Órdenes pendientes</h4>
        <ul>
          <p v-for="order in pendingOrders" :key="order.key">
            {{ order }}
          </p>
          <!-- <li> -->
            <!-- <div class="list-box-listing"> -->
              <!-- <div class="list-box-listing-img"><a href="#"><img src="https://picsum.photos/900/600/?random" alt=""></a></div> -->
              <!-- <div class="list-box-listing-content"> -->
                <!-- <div class="inner"> -->
                  <!-- <h3><a href="#">Tom's Restaurant</a></h3> -->
                  <!-- <span>964 School Street, New York</span> -->
                  <!-- <div class="star-rating" data-rating="3.5"> -->
                    <!-- <div class="rating-counter">(12 reviews)</div> -->
                  <!-- <span class="star"></span><span class="star"></span><span class="star"></span><span class="star half"></span><span class="star empty"></span></div> -->
                <!-- </div> -->
              <!-- </div> -->
            <!-- </div> -->
            <!-- <div class="buttons-to-right"> -->
              <!-- <a href="#" class="button gray"><i class="sl sl-icon-note"></i> Edit</a> -->
              <!-- <a href="#" class="button gray"><i class="sl sl-icon-close"></i> Delete</a> -->
            <!-- </div> -->
          <!-- </li> -->
        </ul>
      </div>
      <p v-else>
        No hay órdenes pendientes por aprobar.
      </p>
    </div>
  </div>
</template>
<script>
  import { DB } from "@/firebase"
  export default {
    created() {
      this.loadPendingOrders()
    },
    data() {
      return {
        pendingOrders: []
      }
    },
    methods: {
      loadPendingOrders() {
        DB.ref("/orders").orderByChild("status").equalTo("pending").on("value", snapshot => {
          snapshot.forEach(x => {
            this.pendingOrders.push({
              key: snapshot.key,
              data: snapshot.val()
            })
          })
        })
      }
    }
  }
</script>