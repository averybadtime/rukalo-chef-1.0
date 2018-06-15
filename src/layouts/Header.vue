<template>
	<header id="header-container" class="fixed">
    <div id="header" class="not-sticky">
      <div class="container">
        <!--Navigation Left-->
        <div class="left-side">
          <div id="logo">
            <router-link to="/">
                <img src="../assets/logo3.png" >
            </router-link>
          </div>
          <div class="mmenu-trigger">
            <button class="hamburger hamburger--collapse" type="button">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
          <nav id="navigation" class="style-1">
            <ul id="responsive">
              <li>
                <router-link to="/ofertas">Promociones</router-link>
              </li>
              <li>
                <router-link to="">Quiero ser Socio Chef!</router-link>
              </li>
            </ul>
          </nav>
          <div class="clearfix"></div>
        </div>
        <!--End Navigation Left-->

        <!--Navigation Right-->
        <div class="right-side">
          <div class="header-widget">
            <!-- If authenticated -->
            <template v-if="authenticated">
              <div class="user-menu">
                <div v-if="user" class="user-name"><span><img :src="user.imgUrl" alt=""></span>{{ user.username }}</div>
                <ul>
                  <li><router-link :to="{ name: 'profileInfo' }" exact><i class="sl sl-icon-user"></i> Perfil</router-link></li>
                  <li><a href="dashboard-messages.html"><i class="sl sl-icon-envelope-open"></i> Messages</a></li>
                  <li><a href="dashboard-bookings.html"><i class="fa fa-calendar-check-o"></i> Bookings</a></li>
                  <li><a @click="logOut"><i class="sl sl-icon-power"></i> LogOut</a></li>
                </ul>
              </div>
            </template>
            <!-- If not authenticated -->
            <template v-else>
              <a href="#sign-in-dialog" class="sign-in popup-with-zoom-anim"><i class="sl sl-icon-login"></i> Autenticarse</a>
            </template>
          </div>
        </div>
    		<!--End Navigation Right-->
      </div>
    </div>
  </header>
</template>

<script>
  import { Store } from "@/store"
  import { AUTH } from "@/firebase"
  export default {
    computed: {
			authenticated() {
				return Store.state.firebaseUser ? true : false
      },
      user() {
        return Store.state.user ? Store.state.user : null
      }
    },
    methods: {
      logOut() {
        AUTH.signOut()
        .then(() => {
          Store.state.firebaseUser = null
          Store.state.user = null
        })
      }
    }
  }
</script>