<template>
	<div class="container-fluid">
		<!--Search container-->
		<div class="main-search-container" data-background-image="./src/assets/img/back-home.jpg">
			<div class="main-search-inner">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<h2>Que quieres comer hoy?</h2>
							<h4>Explora a los mejores platillos y chefs que esten mas cerca a ti</h4>

							<div class="main-search-input">

								<div class="main-search-input-item">
									<input type="text" placeholder="Que estas buscando?" value="" v-model="keyword"/>
								</div>

								<div class="main-search-input-item location">
									<div id="autocomplete-container">
										<input id="autocomplete-input" type="text" placeholder="Direccion" v-model="address">
									</div>
									<a href="#"><i class="fa fa-map-marker"></i></a>
								</div>

								<div class="main-search-input-item">
									<select data-placeholder="Todas las Categorías" class="chosen-select" v-model="category">
										<option>Todas las Categorias</option>
										<option>Hamburguesas</option>
										<option>Carne</option>
										<option>Pollo</option>
										<option>Saludble</option>
										<option>Eventos</option>
									</select>
								</div>

								<button class="button" @click="search()">Buscar</button>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--End Search Container-->

		<!--Most Propular Plate-->
		<div class="row">
			<div class="col-md-12">
				<h3 class="headline centered margin-top-75">
					Platos mas populares
					<span>Encuentra <i>los mas</i> buscados</span>
				</h3>
			</div>
		</div>

		<div class="fullwidth-carousel-container margin-top-25">
			<div class="fullwidth-slick-carousel category-carousel">
				<template v-for="item in trending">
					<rc-carousel-item :item="item"></rc-carousel-item>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import RcCarouselItem from "@/partials/CarouselItem.vue"
	export default {
		components: {
			RcCarouselItem
		},
		data() {
			return {
				keyword: "",
				address: "",
				category: "",
				trending: [
					{ name: 'Nombre 1', quantity: 10 },
          { name: 'Nombre 2', quantity: 100 },
          { name: 'Nombre 3', quantity: 30 },
          { name: 'Nombre 4', quantity: 50 },
          { name: 'Nombre 5', quantity: 60 }
				]
			}
		}
	}
</script>