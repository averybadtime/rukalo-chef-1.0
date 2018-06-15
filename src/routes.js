import Home from "@/pages/Home.vue"
import Offers from "@/pages/Offers.vue"
import Profile from "@/pages/Profile.vue"

import ProfileInfo from "@/partials/profile/Info.vue"
import ProfileReviews from "@/partials/profile/Reviews.vue"
import ProfileOrders from "@/partials/profile/Orders.vue"
import ProfileFavorites from "@/partials/profile/Favorites.vue"
import ProfileAddresses from "@/partials/profile/Addresses.vue"

import NotFound from "@/pages/NotFound.vue"

export const Routes = [
	{ path: "/", component: Home },
	{ path: "/ofertas", component: Offers },
	{ path: "/perfil", component: Profile, children: [
		{ path: "info", component: ProfileInfo, name: "profileInfo" },
		{ path: "reviews", component: ProfileReviews, name: "profileReviews" },
		{ path: "ordenes", component: ProfileOrders, name: "profileOrders" },
		{ path: "favoritos", component: ProfileFavorites, name: "profileFavorites" },
		{ path: "direcciones", component: ProfileAddresses, name: "profileAddresses" },
	] },
	{ path: "*", component: NotFound }
]