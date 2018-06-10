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
    components: {
      RcHeader, RcAuthentication
    }
  }
</script>
