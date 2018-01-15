<template>
	<div class="products-component-container">

		<div class="count">Found products: <span v-if="foundProducts.length == 0" style="color:#ce1414">{{foundProducts.length}}</span><span v-if="foundProducts.length" style="color:#089148">{{foundProducts.length}}</span></div>

		<div class="filters">

		</div>

		<div class="product" v-if="foundProducts.length" v-for="(product, index) in foundProducts">
			<product-card
				class="product-card"
				:eurocode="product.EuroCode"
				:description="product.Description"
				:color="picker(index)"
			/>

			<!-- <div class="product-container" v-if="foundProducts.length" v-for="(product, index) in foundProducts">
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
			</div> -->
		</div>

	</div>
</template>

<script>
	import ProductCard from '~/components/ProductCard.vue';
	export default {
		data() {
			return {};
		},
		computed: {
			foundProducts() {
				return this.$store.getters["modules/products/getAllProducts"];
			}
		},
		components: {
			ProductCard
		},
		methods: {
			picker(index) {
				return index % 2 == 0 ? 'blue-grey darken-1' : 'blue-grey lighten-3';
			}
		}
	};
</script>

<style lang="css" scoped>
	.count {
		font-family: "JosefinSansBold";
		width: 100%;
		height: 32px;
		background-color: #292F36;
		color: #F1F1F1;
		font-weight: 700;
		text-align: center;
		font-size: 26px;
	}
	
	.product {
		/*height: 50px;*/
		font-size: 20px;
		position: relative;
		overflow: hidden;
	}
	
	.results {
		position: relative;
		overflow: hidden;
		margin-top: 20px;
	}
	
	.product-card {
		height: 60px;
		width: 100%;
	}
</style>
