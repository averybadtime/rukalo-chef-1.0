<template>
  <div class="col-lg-6 col-md-12">

		<!-- <a href="" class="listing-item-container" data-marker-id="6"></a> -->

		<router-link :to="{ name: 'chefsingle', params: { id: 1 }}" class="listing-item-container" data-marker-id="6" >
		  <div class="listing-item">
				<img :src="item.picture" alt="">
				<div v-if="item.gender == 'male'" class="listing-badge now-open">Abierto</div>
				<div v-if="item.gender == 'female'" class="listing-badge now-closed">Cerrado</div>

				<div class="listing-item-content">
					<span class="tag">Eat & Drink</span>
					<h3>{{ item.name.first }} {{ item.name.last }}</h3>
					<span>215 Terry Lane, New York</span>
				</div>
				<span class="like-icon"></span>
			</div>
			<div class="star-rating" data-rating="4.5">
				<div class="rating-counter">(  reviews)</div>
  			<span class="star"></span>
  			<span class="star"></span>
  			<span class="star"></span>
  			<span class="star half"></span>
  			<span class="star empty"></span>
			</div>
		</router-link>
	</div>
</template>
<script>
  export default {
    props: {
      item: { type: Object }
    }
  }
</script>