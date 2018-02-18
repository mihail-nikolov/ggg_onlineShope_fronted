<template>
	<v-container>

		<div class="count">Found products: <span v-if="foundProducts.length == 0" style="color:#ce1414">{{foundProducts.length}}</span><span v-if="foundProducts.length" style="color:#089148">{{foundProducts.length}}</span></div>

		<v-container class="filters" v-if="foundProducts.length" align-center>
			<h2 style="text-align:center;">Filter by image</h2>
			<div class="filter-container">
				<v-flex class="filter-by-images" v-for="image in listFilteredImages" :key="image" v-if="isExisting(image)">
					<v-btn-toggle v-model="filterImageId" style="border-radius:5px">
						<v-btn active-class class="filter-image-button" :value="image"><img class="filter-image" :src="image"></v-btn>
					</v-btn-toggle>
				</v-flex>
			</div>
			<v-container fluid class="text-xs-center">
				<v-pagination class="pagination" :length.number="paginationLengthFilterImages" v-model="pageNumFilterImages" :total-visible="7"></v-pagination>
			</v-container>
		</v-container>

		<v-container class="all-products" align-center v-if="foundProducts.length">
			<v-container class="product" v-for="(product, index) in listComponentItems" :key="product.Id">
				<product-card class="product-card" :product="product" :color="picker(index)" @onAddProductToCart="onAddProductToCart" @onProductDetails="onProductDetails" />
			</v-container>
			<v-container fluid class="text-xs-center">
				<v-pagination class="pagination" :length.number="paginationLengthProducts" v-model="pageNumProducts" :total-visible="7"></v-pagination>
			</v-container>
		</v-container>

		<!-- Details Dialog -->
		<product-details-dialog :dialogDetailsOpen="dialogDetailsOpen" :curProductDetails="curProductDetails" @onCloseDetailsDialogClick="onCloseDetailsDialogClick"></product-details-dialog>

		<!-- Cart count Dialog -->
		<v-content v-if="dialogCartCountOpen" class="cart-count-container">
			<v-container fluid style="width:100%;height:100px;background-color:white;">
				<no-ssr>
					<v-dialog v-model="dialogCartCountOpen" persistent max-width="250">
						<v-layout row wrap align-center style="background-color:white;">
							<v-flex row xs6 offset-xs3 style="margin-bottom:20px">
								<h2 style="text-align:center">Count</h2>
							</v-flex>
							<v-flex row xs8 offset-xs3 style="margin-bottom:10px">
								<v-btn color="primary" icon flat @click="decreaseCartCount">
									<v-icon>mdi-minus</v-icon>
								</v-btn>
								<span style="font-size:20px;margin-left:10px;margin-right:10px">{{cartCount}}</span>
								<v-btn color="primary" icon flat @click="increaseCartCount">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-flex>
							<v-flex row xs12>
								<v-btn color="primary" flat @click="onAddCartCountDialogClick">
									<v-icon left>fa-cart-plus</v-icon>
									Add
								</v-btn>
								<v-btn color="primary" flat @click="onCloseCartCountDialogClick">
									<v-icon left>mdi-close</v-icon>
									Close
								</v-btn>
							</v-flex>
						</v-layout>
					</v-dialog>
				</no-ssr>
			</v-container>
		</v-content>

	</v-container>
</template>

<script>
	import ProductCard from '~/components/ProductCard';
	import ProductDetailsDialog from '~/components/ProductDetailsDialog';
	export default {
		components: {
			'product-card': ProductCard,
			'product-details-dialog': ProductDetailsDialog
		},
		data() {
			return {
				pageNumProducts: 1,
				pageNumFilterImages: 1,
				maxElementsToShow: 3,
				maxFiltersToShow: 6,
				filterImageId: 0,
				filteredProducts: [],
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
			allImages() {
				let comp = this,
					images = [];
				if (comp.foundProducts.length > 0) {
					comp.foundProducts.forEach(function(product) {
						product.Images.forEach(function(image) {
							if (images.indexOf(image) === -1 && comp.isExisting(image)) {
								images.push(image);
							}
						});
					});
				}
				return images;
			},
			listFilteredImages() {
				let startElem = (this.pageNumFilterImages - 1) * this.maxFiltersToShow;
				return this.allImages.slice(startElem, this.maxFiltersToShow * this.pageNumFilterImages);
			},
			paginationLengthFilterImages() {
				return Math.ceil(this.allImages.length / this.maxFiltersToShow);
			}
		},
		methods: {
			picker(index) {
				return index % 2 == 0 ? 'blue-grey lighten-5' : 'blue-grey lighten-3';
			},
			onAddProductToCart(product) {
				this.dialogCartCountOpen = true;
				this.currentCartProductToAdd = product;
				console.log("onAddProductToCart", product);
			},
			onProductDetails(product) {
				this.curProductDetails = product;
				this.dialogDetailsOpen = true;
				this.$store.dispatch("modules/products/getProductAvailability", product.Id);
				console.log("onProductDetails", product);
			},
			isExisting(image) {
				if (image !== "/Images/no-image.png") {
					return true;
				} else {
					return false;
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
				product.cartCount = comp.cartCount;
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
			foundProducts() {
				this.filterImageId = 0;
				this.filteredProducts = [];
				this.pageNumProducts = 1;
				this.pageNumFilterImages = 1;
			},
			filterImageId(value) {
				let comp = this;
				comp.pageNumProducts = 1;
				// comp.pageNumFilterImages = 1;
				comp.filteredProducts = [];
				if (value) {
					comp.foundProducts.forEach(function(product) {
						if (product.Images.indexOf(value) !== -1) {
							comp.filteredProducts.push(product);
						}
					});
				} else {
					comp.filteredProducts = [];
				}
			}
		}
	};
</script>

<style lang="css" scoped>
	.cart-count-container {
		background-color: #F1F1F1;
	}
	
	.filter-image-button {
		width: 150px;
		height: 150px;
	}
	
	.filter-image {
		display: block;
		max-width: 150px;
		max-height: 150px;
		object-fit: cover;
		background-size: cover;
		/*box-shadow: 0 0 8px 8px white inset;*/
	}
	
	.filter-by-images {
		margin-top: 10px;
		margin-right: 5px;
		width: 150px;
		height: 150px;
		float: left;
	}
	
	.filter-container {
		height: 330px;
		width: 100%;
	}
	
	.filters {
		width: 29.5%;
		float: left;
		margin-right: 0.5%;
		height: 505px;
		box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
		border-radius: 10px;
	}
	
	.text-xs-center {
		clear: both;
	}
	
	.pagination {
		margin-top: 50px;
	}
	
	.count {
		box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
		border-radius: 10px;
		width: 100%;
		margin-bottom: 5px;
		height: 42px;
		color: #37474F;
		font-weight: 700;
		text-align: center;
		font-size: 26px;
	}
	
	.all-products {
		box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
		border-radius: 10px;
		float: left;
		width: 70%;
	}
	
	.product {
		height: 350px;
		width: 33%;
		float: left;
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
		height: 350px;
	}
</style>
