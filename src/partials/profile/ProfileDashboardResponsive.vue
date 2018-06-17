<template>
  <div class="dashboard-nav">
    <div class="dashboard-nav-inner">
      <ul data-submenu-title="Perfil">
        <li><router-link :to="{ name: 'profileReviews' }" exact><i class="sl sl-icon-star"></i> Mis reviews</router-link></li>
        <li><a><i class="sl sl-icon-layers"></i> Mis pedidos</a>
					<ul>
						<li><router-link :to="{ name: 'profilePendingOrders' }">Pendientes <span class="nav-tag yellow">6</span></router-link></li>
						<li><router-link :to="{ name: 'profileActiveOrders' }">Activas <span class="nav-tag green">1</span></router-link></li>
						<li><router-link :to="{ name: 'profileOnTheWayOrders' }">En camino <span class="nav-tag">2</span></router-link></li>
						<li><router-link :to="{ name: 'profileDeliveredOrders' }">Entregadas <span class="nav-tag red">4</span></router-link></li>
					</ul>	
				</li>
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