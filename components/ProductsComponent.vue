<template>
	<v-content>

		<div class="products-container">
			<v-container class="products" v-if="foundProducts.length">
				<div class="all-products">
					<product-card class="product product-card" v-for="(product, index) in listComponentItems" :key="product.Id" :product="product" :color="picker(index)" @onAddProductToCart="onAddProductToCart" @onProductDetails="onProductDetails" />
				</div>
				<v-container fluid class="text-xs-center" v-if="(filteredProducts.length !== 0 && filteredProducts.length > maxElementsToShow) || (foundProducts.length > maxElementsToShow && filteredProducts.length === 0)">
					<v-pagination class="pagination" :length.number="paginationLengthProducts" v-model="pageNumProducts" :total-visible="7"></v-pagination>
				</v-container>
			</v-container>
		</div>


		<!-- Details Dialog -->
		<product-details-dialog :dialogDetailsOpen="dialogDetailsOpen" :curProductDetails="curProductDetails" @onCloseDetailsDialogClick="onCloseDetailsDialogClick"></product-details-dialog>

		<!-- Cart count Dialog -->
		<v-content v-if="dialogCartCountOpen" class="cart-count-container">
			<v-container fluid style="width:100%;height:100px;background-color:white;">
				<no-ssr>
					<v-dialog v-model="dialogCartCountOpen" persistent max-width="300">
						<v-layout row wrap align-center style="background-color:white;">
							<v-flex row xs6 offset-xs3 style="margin-bottom:20px">
								<h2 style="text-align:center; padding: 15px;">Количество</h2>
							</v-flex>
							<v-flex row xs8 offset-xs3 style="margin-bottom:10px">
								<v-btn color="primary" icon flat @click="decreaseCartCount">
									<v-icon>mdi-minus</v-icon>
								</v-btn>
								<input type="number" name="cartCount" v-model="cartCount" style="display: inline-block; width: 50px; text-align: center; font-size: 20px;"></input>
								<v-btn color="primary" icon flat @click="increaseCartCount">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-flex>

							<v-container style="display: flex;">
								<v-btn class="flex" color="primary" flat @click="onAddCartCountDialogClick">
									<v-icon left>fa-cart-plus</v-icon>
									Добави
								</v-btn>
								<v-btn class="flex" color="primary" flat @click="onCloseCartCountDialogClick">
									<v-icon left>mdi-close</v-icon>
									Затвори
								</v-btn>
							</v-container>
						</v-layout>
					</v-dialog>
				</no-ssr>
			</v-container>
		</v-content>

	</v-content>
</template>

<script>
	import ProductCard from '~/components/ProductCard';
	import ProductDetailsDialog from '~/components/ProductDetailsDialog';
	import scrollTo from "~/utils/scrollTo";

	export default {
		components: {
			'product-card': ProductCard,
			'product-details-dialog': ProductDetailsDialog
		},
		data() {
			return {
				pageNumProducts: 1,
				maxElementsToShow: 6,
				maxFiltersToShow: 8,
				dialogDetailsOpen: false,
				dialogCartCountOpen: false,
				curProductDetails: null,
				cartCount: 1,
				currentCartProductToAdd: null
			};
		},
		computed: {
			foundProducts() {
				return this.$store.getters["modules/products/getAllProducts"];
			},
			paginationLengthProducts() {
				if (this.filteredProducts.length > 0) {
					return Math.ceil(this.filteredProducts.length / this.maxElementsToShow);
				} else {
					return Math.ceil(this.foundProducts.length / this.maxElementsToShow);
				}
			},
			listComponentItems() {
				let startElem = (this.pageNumProducts - 1) * this.maxElementsToShow;

				if (this.filteredProducts.length > 0) {
					return this.filteredProducts.slice(startElem, this.maxElementsToShow * this.pageNumProducts);
				} else {
					return this.foundProducts.slice(startElem, this.maxElementsToShow * this.pageNumProducts);
				}
			},
			filteredProducts() {
				return this.$store.getters["modules/products/getFilteredProducts"];
			}
		},
		methods: {
			scrollToResults() {
				const productsContainer = document.body.querySelector("main.content .products-container");

				scrollTo(productsContainer.offsetTop - 120, 300);
			},
			picker(index) {
				return "white";
			},
			onAddProductToCart(product) {
				this.dialogCartCountOpen = true;
				this.currentCartProductToAdd = product;
				console.log("onAddProductToCart", product);
			},
			onProductDetails(product) {
				this.curProductDetails = product;
				this.dialogDetailsOpen = true;
				if (product.item) {
					const { Id: id } = product.item;
					this.$store.dispatch("modules/products/getProductAvailability", id);
				}
			},
			onCloseCartCountDialogClick() {
				this.cartCount = 1;
				this.dialogCartCountOpen = false;
			},
			increaseCartCount() {
				this.cartCount++;
			},
			decreaseCartCount() {
				if (this.cartCount > 1) {
					this.cartCount--;
				}
			},
			onAddCartCountDialogClick() {
				let comp = this,
					product = {};
				product.item = JSON.parse(JSON.stringify(comp.currentCartProductToAdd));
				product.cartCount = ~~comp.cartCount;
				comp.$store.dispatch("modules/cart/addItemToCart", {
					productToBeAdded: product,
					originalProduct: comp.currentCartProductToAdd
				});
				comp.cartCount = 1;
				comp.dialogCartCountOpen = false;
			},
			onCloseDetailsDialogClick(value) {
				this.dialogDetailsOpen = value;
			}
		},
		watch: {
			filteredProducts() {
				this.pageNumProducts = 1;
			},
			pageNumProducts() {
				this.scrollToResults();
			}
		}
	};
</script>

<style lang="css" scoped>
	.products-container {
		display: grid;
		grid-template-areas: "products products products products products";
		grid-column-gap: 40px;
		grid-row-gap: 40px;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		padding: 0 60px;
	}

	.products-container .filters {
		grid-area: filter;
		margin: 0;
		padding: 0;
	}

	.products-container .products {
		grid-area: products;
		display: grid;
		margin: 0 auto;
		padding: 0;
	}

	.products-container .filters .filters-card {
		box-shadow: 0 2px 20px 0 rgba(0,0,0,0.05);
	}

	.products-container .filters .filters-title {
		padding: 15px 20px;
	}

	.products-container .filters .filter-by-images {
		display: flex;
		justify-content: center;
	}

	.products-container .all-products {
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(350px, 1fr) );
		grid-column-gap: 40px;
		grid-row-gap: 40px;
		margin: 0;
		padding: 0;
	}

	.filter-container {
		width: 100%;
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(150px, 1fr) );
		grid-column-gap: 20px;
		grid-row-gap: 30px;
		padding: 0 20px;
		padding-bottom: 20px;
	}

	.cart-count-container {
		background-color: #F1F1F1;
	}
	
	.filter-image-button {
		width: 140px;
		height: 140px;
	}
	
	.filter-image {
		display: block;
		max-width: 130px;
		max-height: 130px;
		object-fit: cover;
		background-size: cover;
		/*box-shadow: 0 0 8px 8px white inset;*/
	}	
	
	.text-xs-center {
		clear: both;
	}
	
	.pagination {
		margin-top: 10px;
	}
	
	.product {
		font-size: 20px;
	}
	
	.results {
		position: relative;
		overflow: hidden;
		margin-top: 20px;
	}	

	@media all and (max-width: 992px) {
		.products-container {
            padding: 0 200px;
		}

		.filter-container {
			/*grid-template-columns: repeat( 12, minmax(150px, 1fr) );*/
		}
	}
    /*@media all and (max-width: 780px) {*/
        /*.products-container {*/
        /*}*/
    /*}*/
    @media all and (max-width: 820px) {
        .products-container {
            padding: 0 120px;
        }
    }
    @media all and (max-width: 680px) {
        .products-container {
            padding: 0 80px;
        }
    }
    @media all and (max-width: 580px) {
        .products-container {
            padding: 0 20px;
        }
    }
</style>
