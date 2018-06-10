<template>
	<div id="header-container">
    <div id="header">
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
              <!-- <li>
                <router-link to="/" class="current">
                  Inicio
                </router-link>

                <ul>
                  <li><a href="index.html">Home 1</a></li>
                  <li><a href="index-2.html">Home 2</a></li>
                  <li><a href="index-3.html">Home 3</a></li>
                  <li><a href="index-4.html">Home 4</a></li>
                </ul>
              </li> -->
             

              <li>
                <router-link to="/ofertas">Promociones</router-link>
              </li>

              <li>
                <router-link :to="{ name:'chefsingle', params: { id: 1 } }">Quiero ser Socio Chef!</router-link>
              </li>

              <!-- <li>
                <router-link to="/">
                  Listening
                </router-link>
              </li> -->
            </ul>
          </nav>
          <div class="clearfix"></div>
        </div>
        <!--End Navigation Left-->

        <!--Navigation Right-->
        <div class="right-side">
          <div class="header-widget">
            <a href="#sign-in-dialog" class="sign-in popup-with-zoom-anim"><i class="sl sl-icon-login"></i> Ingresar</a>
            <a href="#sign-in-dialog" class="button border with-icon  popup-with-zoom-anim">Registrarse <i class="sl sl-icon-plus"></i></a>
          </div>
        </div>
    		<!--End Navigation Right-->

      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>