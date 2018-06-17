import Home from "@/pages/Home.vue"
import Offers from "@/pages/Offers.vue"
import Profile from "@/pages/Profile.vue"

import ProfileInfo from "@/partials/profile/Info.vue"
import ProfileReviews from "@/partials/profile/Reviews.vue"
import ProfileOrders from "@/partials/profile/Orders.vue"
import ProfilePendingOrders from "@/partials/profile/orders/PendingOrders.vue"
import ProfileActiveOrders from "@/partials/profile/orders/ActiveOrders.vue"
import ProfileOnTheWayOrders from "@/partials/profile/orders/OnTheWayOrders.vue"
import ProfileDeliveredOrders from "@/partials/profile/orders/DeliveredOrders.vue"
import ProfileFavorites from "@/partials/profile/Favorites.vue"
import ProfileAddresses from "@/partials/profile/Addresses.vue"

import NotFound from "@/pages/NotFound.vue"

export const Routes = [
	{ path: "/", component: Home },
	{ path: "/ofertas", component: Offers },
	{ path: "/perfil", component: Profile, children: [
		{ path: "info", component: ProfileInfo, name: "profileInfo" },
		{ path: "reviews", component: ProfileReviews, name: "profileReviews" },
		{ path: "ordenes", component: ProfileOrders, name: "profileOrders", children: [
			{ path: "pendientes", component: ProfilePendingOrders, name: "profilePendingOrders" },
			{ path: "activas", component: ProfileActiveOrders, name: "profileActiveOrders" },
			{ path: "en-camino", component: ProfileOnTheWayOrders, name: "profileOnTheWayOrders" },
			{ path: "entregadas", component: ProfileDeliveredOrders, name: "profileDeliveredOrders" }
		] },
		{ path: "favoritos", component: ProfileFavorites, name: "profileFavorites" },
		{ path: "direcciones", component: ProfileAddresses, name: "profileAddresses" },
	] },
	{ path: "*", component: NotFound }
]