<template>
	<v-layout>
		<v-flex xs1 sm12>
			<v-card class="card" :color="color">
				<v-card-media height="200px" contain :src="product.Images[0]">
				</v-card-media>
				<v-card-title class="description-text">
					<span class="description-text">{{product.Description}}</span>
				</v-card-title>
				<v-card-actions>
					<v-btn :color="color" @click="onAddProductToCart(product)" style="width:50%">
						<v-icon left>fa-cart-plus</v-icon>
						Add to cart
					</v-btn>
					<v-btn :color="color" @click="onProductDetails(product)" style="width:50%">
						<v-icon left>fa-info-circle</v-icon>
						Details
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		props: ['product', 'color'],
		methods: {
			onAddProductToCart(product) {
				this.$emit('onAddProductToCart', product);
			},
			onProductDetails(product) {
				this.$emit('onProductDetails', product);
			}
		}
	};
</script>

<style lang="css" scoped>
	.code {
		width: 200px;
		color: black;
	}
	
	.card {
		border-radius: 5px;
		height: 350px;
		box-shadow: 0 0 6px 2px hsla(0, 0%, 0%, 0.2);
	}
	
	.description-container {
		height: 50px;
		text-overflow: ellipsis;
	}
	
	.description-text {
		height: 80px;
		text-overflow: ellipsis;
		/*white-space: nowrap;*/
		width: 100%;
		display: block;
		overflow: hidden;
	}
	
	.card-actions {
		display: -webkit-flex;
		-webkit-align-items: center;
		display: flex;
		align-items: center;
		box-shadow: 0 0 3px 1px hsla(0, 0%, 0%, 0.2);
	}
</style>
