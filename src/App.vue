<template>
  <div id="app">
    <rc-authentication></rc-authentication>
		<rc-header></rc-header>
    <router-view/></router-view>
  </div>
</template>

<script>
	import RcHeader from "@/layouts/Header.vue"
  import RcAuthentication from "@/partials/Authentication.vue"
  export default {
    mounted() {
      this.loadScripts()
    },
    components: {
      RcHeader, RcAuthentication
    },
    methods: {
      loadScripts() {
        // Cargo los script dinámicamente aquí, porque el DOM carga antes de que firebase de respuesta de autenticación y los elementos no alcanzan a estar creados cuando jQuery y los demás pluggins ya los están manipulando al cargar dentro del mismo.
        const scripts = [
          "../src/scripts/mmenu.min.js",
          "../src/scripts/chosen.min.js",
          "../src/scripts/slick.min.js",
          "../src/scripts/rangeslider.min.js",
          "../src/scripts/magnific-popup.min.js",
          "../src/scripts/waypoints.min.js",
          "../src/scripts/counterup.min.js",
          "../src/scripts/jquery-ui.min.js",
          "../src/scripts/tooltips.min.js",
          "../src/scripts/md5.min.js",
          "../src/scripts/custom.js"
        ]
        scripts.forEach(script => {
          let tag = document.createElement("script")
          tag.type = "text/javascript"
          tag.src = script
          document.getElementsByTagName("head")[0].appendChild(tag)
        })
      }
    }
  }
</script>
