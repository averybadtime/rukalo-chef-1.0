<template>
  <div class="row">
    <div class="col-lg-6 col-md-12">
      <div class="dashboard-list-box margin-top-0">
        <h4 class="gray">Detalles del perfil</h4>
        <div class="dashboard-list-box-static">
          
          <!-- Avatar -->
          <!-- <form @submit.prevent="uploadNewUserProfilePicture"> -->
            <div class="edit-profile-photo">
              <img :src="user.photoUrl || 'http://via.placeholder.com/500x500'" :alt="'Foto de perfil de' + user.name">
              <div class="change-photo-btn">
                <div class="photoUpload">
                  <span><i class="fa fa-upload"></i> Subir foto</span>
                  <!-- <input type="file" class="upload" /> -->
                  <file-uploader :reference="reference" :multiple="false"></file-uploader>
                </div>
              </div>
            </div>
            <!-- <button class="button">Guardar foto</button>
          </form> -->
          <hr>
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
        <h4 class="gray">Cambiar contraseña</h4>
        <div class="dashboard-list-box-static">
          <form @submit.prevent="changeUserPassword">
            <!-- Change Password -->
            <div class="my-profile">
              <label>Antigua contraseña</label>
              <input type="password" v-model="password.old">

              <label>Nueva contraseña</label>
              <input type="password" v-model="password.new">

              <label>Confirmación nueva contraseña</label>
              <input type="password" v-model="password.confirmNew">
              
              <button type="submit" class="button margin-top-15">Cambiar contraseña</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from "firebase"
  import { DB, AUTH } from "@/firebase"
  import { Store } from "@/store"
  import hasEmptyFields from "@/mixins/hasEmptyFields"
  import FileUploader from "@/widgets/FileUploader.vue"
  export default {
    components: {
      FileUploader
    },
    mixins: [hasEmptyFields],
    created() {
      this.setUserProfile()
    },
    data() {
      return {
        userProfile: {},
        reference: "/users/users/" + Store.state.firebaseUser.uid + "/profileInfo/photoUrl",
        password: {
          old: "",
          new: "",
          confirmNew: ""
        }
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
      },
      changeUserPassword() {
        if (this.hasEmptyFields(this.password)) {
          const message = "No has rellenado todos los campos."
          console.error(message)
          alert(message)
          return
        }
        if (this.password.new !== this.password.confirmNew) {
          const message = "Las contraseñas no coinciden. Inténtalo de nuevo."
          console.error(message)
          alert(message)
        } else {
          const user = AUTH.currentUser
          let credential = firebase.auth.EmailAuthProvider.credential(this.user.email, this.password.old)

          user.reauthenticateWithCredential(credential).then(() => {
            AUTH.currentUser.updatePassword(this.password.new)
            .then(() => {
              this.password.old = ""
              this.password.new = ""
              this.password.confirmNew = ""
              console.log("Contraseña cambiada con éxito.")
            })
          }).catch(err => console.error(err))
        }
      }
    }
  }
</script>
