<template>
  <div class="row">
    <div class="col-lg-6 col-md-12">
      <div class="dashboard-list-box margin-top-0">
        <h4 class="gray">Detalles del perfil</h4>
        <div class="dashboard-list-box-static">
          
          <!-- Avatar -->
          <div class="edit-profile-photo">
            <img :src="user.photoUrl || 'http://via.placeholder.com/500x500'" :alt="'Foto de perfil de' + user.name">
            <div class="change-photo-btn">
              <div class="photoUpload">
                  <span><i class="fa fa-upload"></i> Upload Photo</span>
                  <input type="file" class="upload" />
              </div>
            </div>
            <button class="button margin-top-15">Guardar cambios</button>
          </div>

          <!-- Details -->
          <form @submit.prevent="saveUserProfile">
            <div class="my-profile">
              <label>Nombre</label>
              <input type="text" v-model="userProfile.name">

              <label>Número telefónico</label>
              <input type="number" v-model="userProfile.phoneNumber">

              <label>E-mail</label>
              <input type="email" :value="firebaseUser.email" readonly>

              <label>Breve reseña</label>
              <textarea name="bio" id="bio" cols="30" rows="10" v-model="userProfile.bio"></textarea>

              <label>Edad</label>
              <input type="number" v-model.number="userProfile.age">
            </div>
            <button type="submit" class="button margin-top-15">Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Change Password -->
    <div class="col-lg-6 col-md-12">
      <div class="dashboard-list-box margin-top-0">
        <h4 class="gray">Change Password</h4>
        <div class="dashboard-list-box-static">

          <!-- Change Password -->
          <div class="my-profile">
            <label class="margin-top-0">Current Password</label>
            <input type="password">

            <label>New Password</label>
            <input type="password">

            <label>Confirm New Password</label>
            <input type="password">

            <button class="button margin-top-15">Change Password</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { DB } from "@/firebase"
  import { Store } from "@/store"
  export default {
    created() {
      this.setUserProfile()
    },
    data() {
      return {
        userProfile: {}
      }
    },
    computed: {
      firebaseUser() {
        return Store.state.firebaseUser
      },
      user() {
        return Store.state.user
      }
    },
    methods: {
      setUserProfile() {
        this.userProfile = Object.assign({}, {
          name: this.user.name || null,
          phoneNumber: this.user.phoneNumber || null,
          email: this.user.email || null,
          bio: this.user.bio || null,
          age: this.user.age || null
        })
      },
      saveUserProfile() {
        const userProfileRef = "/users/users/" + this.firebaseUser.uid + "/profileInfo"
        DB.ref(userProfileRef).update(this.userProfile)
        .then(() => {
          DB.ref(userProfileRef).once("value", snapshot => {
            this.userProfile = snapshot.val()
          }).then(() => console.info("Información actualizada."))
        })
      }
    }
  }
</script>
