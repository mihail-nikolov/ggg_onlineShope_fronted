<template>
	<v-container class="cart-panel-container">
		<v-container>
			<v-layout row>
				<v-flex sm2 align-content-center>
					<v-btn color="primary" icon flat @click="slideDrawerOut">
						<v-icon large>mdi-arrow-right</v-icon>
					</v-btn>
				</v-flex>
				<v-flex sm8 align-content-center>
					<h2 class="cart-panel-title" v-if="addedItemsToCartCount">Количка</h2>
					<h2 class="cart-panel-title" v-else>Количката е празна</h2>
				</v-flex>
			</v-layout>
		</v-container>

		<v-container class="cart-panel-card" v-for="(cartItem, index) in addedItemsToCart" :key="index">
			<v-layout row wrap>
				<v-flex xs12>
					<v-card class="panel-card" color="blue-grey lighten-5">
						<v-container fluid>
							<v-layout row>
								<v-flex xs4 column>
									<v-card-media height="130px" contain left>
										<v-carousel class="panel-card-carousel" hide-controls hide-delimiters interval="3500">
											<v-carousel-item v-for="(image,i) in cartItem.item.Images" :src="image" :key="i" contain></v-carousel-item>
										</v-carousel>
									</v-card-media>
									<v-btn color="primary" flat @click="onProductDetails(cartItem)">
										<v-icon left>mdi-information-outline</v-icon>
										Детайли
									</v-btn>
								</v-flex>
								<v-flex xs8>

									<v-flex column>
										<v-card-title>
											<h3 style="width:100%">Eurocode: {{cartItem.item.EuroCode}}</h3>
											<div style="width:100%">{{cartItem.item.Description}}</div>
											<div style="font-weight:bold;margin-top:10px;width:100%">Цена: 100lv</div>
										</v-card-title>
									</v-flex>

									<v-flex column>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="primary" icon flat @click="removeProductFromCart(index)">
												<v-icon>mdi-delete</v-icon>
											</v-btn>
										</v-card-actions>
									</v-flex>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<v-container>
			<v-layout row>
				<v-flex xs5 offset-xs7>
					<h3 class="total-sum-text">Общо: {{totalSum}}lv</h3>
					<h3 class="total-sum-text">Доставка: 0lv</h3>
					<br>
					<h2 class="total-sum-text">Крайна сума: {{totalSum}}lv</h2>
					<v-flex right>
						<v-btn color="primary" @click="onCheckout">
							<v-icon left>mdi-credit-card-multiple</v-icon>
							Плати
						</v-btn>
					</v-flex>
				</v-flex>
			</v-layout>
		</v-container>
	</v-container>
</template>

<script>
	export default {
		name: 'CartPanel',
		data() {
			return {};
		},
		computed: {
			addedItemsToCart() {
				return this.$store.getters["modules/cart/getCartItems"];
			},
			addedItemsToCartCount() {
				let count = 0;
				this.$store.getters["modules/cart/getCartItems"].forEach(function(product) {
					count += product.cartCount;
				});
				return count;
			},
			totalSum() {
				let sum = 0;
				this.$store.getters["modules/cart/getCartItems"].forEach(function(product) {
					sum += product.cartCount;
				});
				return sum * 100;
			}
		},
		methods: {
			decreaseProductQuantity(product, index) {
				console.log("decrease product -> ", product, "index -> ", index);
				if (product.cartCount > 1) {
					console.log("decrease cartCount ", product.cartCount);
					let count = parseInt(product.cartCount) - 1;
					console.log("decrease count ", count);
					this.$store.dispatch('modules/cart/changeCountOfItemInCart', {
						index: index,
						count: count
					});
				}
			},
			increaseProductQuantity(product, index) {
				console.log("increase product -> ", product, "index -> ", index);
				let count = parseInt(product.cartCount) + 1;
				console.log("increase count ", count);
				this.$store.dispatch('modules/cart/changeCountOfItemInCart', {
					index: index,
					count: count
				});
			},
			removeProductFromCart(index) {
				this.$store.dispatch('modules/cart/removeProductFromCart', index);
			},
			onCheckout() {
				console.log("CHECKOUT");
			},
			slideDrawerOut() {
				this.$emit('slideDrawerOut');
			},
			onProductDetails(product) {
				this.$emit('cartPanelDetailsButtonClicked', product);
			}
		},
		watch: {
			addedItemsToCart(value) {
				console.log("New items -> ", value);
				sessionStorage.removeItem('autoGlassAddedToCartItems');
				sessionStorage.setItem('autoGlassAddedToCartItems', JSON.stringify(value));
			}
		}
	};
</script>

<style lang="css" scoped>
	.product-quantity {
		font-size: 20px;
		width: 70px;
		display: inline-block;
		text-align: center;
	}
	
	.action-title {
		text-align: center;
		font-weight: bold;
	}
	
	.total-product-sum {
		text-align: center;
		font-size: 20px;
	}
	
	.total-sum-text {
		padding-left: 10px;
	}
	
	.cart-panel-container {}
	
	.cart-panel-card {}
	
	.panel-card {}
	
	.panel-card-carousel {
		height: 130px;
	}
	
	.cart-panel-title {
		text-align: center;
	}
</style>
