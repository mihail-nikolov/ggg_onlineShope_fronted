<template>
	<v-layout>
		<v-flex xs12 @click="onProductDetails(product)">
			<v-card class="card" :color="color">
				<v-card-media class="image-preview" height="200px" contain :src="product.Images[0]"></v-card-media>
				<v-card-title class="description-text">
					<span class="description-text">{{product.Description}}</span>
				</v-card-title>
				<v-card-actions class="actions">
					<v-btn :color="btnColor" @click.stop="onAddProductToCart(product)">
						<v-icon left>mdi-cart-outline</v-icon>
						Добави
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn flat icon :color="btnColor" @click.stop="onProductDetails(product)">
						<v-icon>mdi-information-outline</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		props: ['product', 'color', 'btnColor'],
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
		border-radius: 3px;
		height: 350px;
		border: 1px solid #e8e8e8 !important;
		box-shadow: none;
		transition: box-shadow .3s cubic-bezier(0, .5, 0, .5);
		will-change: box-shadow;
		cursor: pointer;
	}

	.card:hover {
		box-shadow: 0 7px 8px -4px rgba(0,0,0,.14), 0 12px 17px 2px rgba(0,0,0,.08), 0 5px 22px 4px rgba(0,0,0,.06);
	}

	.image-preview {
		margin: 0 20px;
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
	
	.actions {
		padding: 20px 15px;
	}
</style>
