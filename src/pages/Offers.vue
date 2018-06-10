<template>
  <div>
    <div id="titlebar">
    	<div class="container">
    		<div class="row">
    			<div class="col-md-12">
    				<h2>Promociones</h2>
    			</div>
    		</div>
    	</div>
    </div>
    <div class="container">
      <div class="row">
        <rc-result-item :item="item"></rc-result-item>
        <rc-result-item :item="item"></rc-result-item>
        <rc-result-item :item="item"></rc-result-item>
        <rc-result-item :item="item"></rc-result-item>
        <rc-result-item :item="item"></rc-result-item>
      </div>
    </div>
  </div>
</template>
<script>
  import RcResultItem from "@/partials/ResultItem.vue"
  export default {
    components: {
      RcResultItem
    },
    data() {
      return {
        item: {
          name: "food",
          picture: "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg"
        }
      }
    }
  }
</script>