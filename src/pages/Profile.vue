<template>
  <!-- Wrapper -->
  <div id="wrapper">
  <!-- Dashboard -->
    <div id="dashboard">
      
      <a href="#" class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i> Dashboard Navigation</a>
      <profile-dashboard-responsive></profile-dashboard-responsive>
      
      <!-- Content
      ================================================== -->
      <div class="dashboard-content">

        <!-- Titlebar -->
        <div class="row">
          <div class="col-md-12">
            <h2>Perfil</h2>
            <nav id="breadcrumbs">
              <ul>
                <li><router-link to="/">Inicio</router-link></li>
                <li>Perfil</li>
              </ul>
            </nav>
          </div>
        </div>

        <router-view></router-view>

        <div class="row">
          <!-- Copyrights -->
          <div class="col-md-12">
            <div class="copyrights">© 2017 Listeo. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ProfileDashboardResponsive from "@/partials/profile/ProfileDashboardResponsive.vue"
  export default {
    components: {
      ProfileDashboardResponsive
    },
    mounted() {
      toggleDashboardResponsive()
    }
  }
</script>