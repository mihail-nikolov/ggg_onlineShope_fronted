<template>
	<div class="products-component-container">

		<div class="result-count-container">
			<button class="result-count-button" v-on:click="showProducts = !showProducts">Found products: {{foundProducts.length}}</button>
		</div>

		<div class="search-results" v-if="showProducts" v-for="(product, index) in foundProducts">
			<div class="product-container">
				<span>{{index + 1}}.</span>
				<div class="eurocode-container">
					<label>Eurocode: </label>
					<span>{{product.EuroCode}}</span>
				</div>
				<div class="material-number-container">
					<label>Material number: </label>
					<span>{{product.MaterialNumber}}</span>
				</div>
				<div class="industry-code-container">
					<label>Industry code: </label>
					<span>{{product.IndustryCode}}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				showProducts: false
			};
		},
		computed: {
			foundProducts() {
				return this.$store.getters["modules/products/getAllProducts"];
			}
		}
	};
</script>

<style lang="css" scoped>
	.product-container {
		height: 100px;
		margin-left: 15px;
		font-size: 20px;
	}
	
	.eurocode-container,
	.material-number-container,
	.industry-code-container {
		margin-left: 10px;
		display: inline-block;
	}
	
	.result-count-container {
		margin-top: 30px;
		margin-left: 720px;
		width: 200px;
	}
	
	.result-count-button {
		width: 150px;
		height: 60px;
		background-color: #292F36;
		color: #FFFFFF;
		font-weight: 700;
		font-size: 16px;
	}
	
	.result-count-button:hover {
		color: #008C4E;
	}
</style>
