<template>
  <div class="fw-carousel-item">
		<div class="category-box-container">
			<a href="listings-half-screen-map-grid-1.html" class="category-box" data-background-image="https://picsum.photos/900/600/?random">
				<div class="category-box-content">
					<h3>{{ item.name }}</h3>
					<span>{{ item.quantity }} Vistas</span>
				</div>
				<span class="category-box-btn">Browse</span>
			</a>
		</div>
  </div>
</template>
<script>
  export default {
    props: {
      item: { type: Object }
    }
  }
</script>