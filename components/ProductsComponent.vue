<template>
	<v-container>

		<div class="count">Found products: <span v-if="foundProducts.length == 0" style="color:#ce1414">{{foundProducts.length}}</span><span v-if="foundProducts.length" style="color:#089148">{{foundProducts.length}}</span></div>

		<v-container class="filters" v-if="foundProducts.length" align-center>
			<h2 style="text-align:center;">Filter by image</h2>
			<div class="filter-container">
				<v-flex class="filter-by-images" v-for="image in listFilteredImages" :key="image" v-if="isExisting(image)">
					<v-btn-toggle v-model="filterImageId">
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

		<v-content v-if="dialogDetailsOpen" class="details-dialog">
			<v-container fluid fill-height style="width: 100%;">

				<no-ssr>
					<v-dialog v-model="dialogDetailsOpen" persistent max-width="400">
						<v-card>
							<v-card-title class="headline">You need to provide your username and password to use TPMS</v-card-title>
							<v-card-text>
								<v-text-field name="settings-user-id" label="Username"></v-text-field>
								<v-text-field name="settings-user-password" label="Password"></v-text-field>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" flat>login</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</no-ssr>

			</v-container>
		</v-content>

	</v-container>
</template>

<script>
	import ProductCard from '~/components/ProductCard';
	export default {
		components: {
			ProductCard
		},
		data() {
			return {
				pageNumProducts: 1,
				pageNumFilterImages: 1,
				maxElementsToShow: 3,
				maxFiltersToShow: 6,
				filterImageId: 0,
				filteredProducts: [],
				dialogDetailsOpen: false
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
				this.dialogDetailsOpen = true;
				console.log("onAddProductToCart", product);
			},
			onProductDetails(product) {
				console.log("onProductDetails", product);
			},
			isExisting(image) {
				if (image !== "/Images/no-image.png") {
					return true;
				} else {
					return false;
				}
			}
		},
		watch: {
			foundProducts() {
				this.filterImageId = 0;
				this.filteredProducts = [];
				this.pageNumProducts = 1;
			},
			filterImageId(value) {
				var comp = this;
				comp.pageNumProducts = 1;
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
	.details-dialog {
		clear: both;
		position: absolute;
		width: 89%;
		height: 35%;
	}
	
	.filter-image-button {
		width: 150px;
		height: 150px;
	}
	
	.filter-image {
		display: block;
		width: 150px;
		object-fit: cover;
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
		font-family: "JosefinSansBold";
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
