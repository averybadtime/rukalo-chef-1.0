<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Mis direcciones</h3>
      <em>Tenga en cuenta que solo puede tener un máximo de 5 (cinco) direcciones registradas.</em>
      <p v-if="isLoadingAddresses">Obteniendo direcciones...</p>
      <template v-else>
        <div v-if="addresses.length > 0" class="dashboard-list-box with-icons margin-top-20">
					<h4>Direcciones guardadas</h4>
					<ul>
						<li v-for="a in addresses" :key="a.key">
							<i class="list-box-icon sl sl-icon-layers"></i> <strong>{{ a.data.name }}</strong>
              <br> {{ a.data.address }}
              <p>Teléfono de contacto: <strong>{{ a.data.phone }}</strong></p>
							<a @click="deleteAddress(a.key)" class="close-list-item"><i class="fa fa-close"></i></a>
						</li>
					</ul>
				</div>
        <p v-else>No tienes direcciones guardadas aún.</p>
      </template>
      <hr>
      <template v-if="this.addresses.length < 5">
        <h4>Nueva dirección</h4>
        <form @submit.prevent="saveAddress">
          <div class="col-xs-12 col-md-4">
            <label for="name">Alias para esta dirección</label>
            <input type="text" name="name" v-model="newAddress.name">
          </div>
          <div class="col-xs-12 col-md-4">
            <label for="address">Dirección</label>
            <input type="text" name="address" v-model="newAddress.address">
          </div>
          <div class="col-xs-12 col-md-4">
            <label for="phone">Teléfono de contacto</label>
            <input type="number" name="phone" v-model="newAddress.phone">
          </div>
          <div class="col-xs-12 col-md-4">
            <button type="submit" class="button">Guardar dirección</button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
  import { DB } from "@/firebase"
  import hasEmptyFields from "@/mixins/hasEmptyFields"
  export default {
    mixins: [
      hasEmptyFields
    ],
    created() {
      this.getAddresses()
    },
    data() {
      return {
        isLoadingAddresses: true,
        addresses: [],
        newAddress: {
          name: "",
          address: "",
          phone: ""
        },
        userAddressesRef: DB.ref("/users/users/" + this.$store.state.firebaseUser.uid + "/addresses"),
        onChildAdded: null,
        onChildRemoved: null
      }
    },
    methods: {
      getAddresses() {
        this.onChildAdded = this.userAddressesRef.on("child_added", snapshot => {
          this.addresses.push({
            key: snapshot.key,
            data: snapshot.val()
          })
          this.isLoadingAddresses = false
        })
        this.onChildRemoved = this.userAddressesRef.on("child_removed", snapshot => {
          this.addresses = this.addresses.filter(x => x.key !== snapshot.key)
        })
      },
      saveAddress() {
        if (this.hasEmptyFields(this.newAddress)) {
          const message = "No has rellenado todos los campos."
          console.error(message)
          alert(message)
          return
        }
        this.userAddressesRef.push({
          name: this.newAddress.name,
          address: this.newAddress.address,
          phone: this.newAddress.phone
        }).then(() => {
          this.newAddress = {
            name: "", address: "", phone: ""
          }
          alert("Guardado.")
        })
      },
      deleteAddress(key) {
        this.userAddressesRef.child(key).set(null)
        .then(() => alert("Borrado con éxito."))
      }
    },
    beforeDestroy() {
      this.userAddressesRef.off("child_added", this.onChildAdded)
      this.userAddressesRef.off("child_removed", this.onChildRemoved)
    }
  }
</script>
