<template>
  <div class="dashboard-nav">
    <div class="dashboard-nav-inner">
      <ul data-submenu-title="Perfil">
        <li><router-link :to="{ name: 'profileReviews' }" exact><i class="sl sl-icon-star"></i> Mis reviews</router-link></li>
        <li><router-link :to="{ name: 'profileOrders' }" exact><i class="sl sl-icon-heart"></i> Mis pedidos</router-link></li>
        <li><router-link :to="{ name: 'profileFavorites' }" exact><i class="sl sl-icon-star"></i> Mis favoritos</router-link></li>
        <li><router-link :to="{ name: 'profileAddresses' }" exact><i class="sl sl-icon-heart"></i> Mis direcciones</router-link></li>
      </ul>	

      <ul data-submenu-title="Cuenta">
        <li class="active"><router-link :to="{ name: 'profileInfo' }" exact><i class="sl sl-icon-user"></i> Mi perfil</router-link></li>
        <li><a href="index.html"><i class="sl sl-icon-power"></i> Cerrar sesión</a></li>
      </ul>
    </div>
  </div>
</template>