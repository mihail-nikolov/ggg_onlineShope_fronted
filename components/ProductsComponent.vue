<template>
	<v-content>

		<div class="products-container">
			<v-container class="products" v-if="foundProducts.length && productsAreFetched">
				<div class="all-products">
					<product-card class="product product-card" v-for="(product, index) in listComponentItems" :key="product.Id" :product="product" :color="picker(index)" @onAddProductToCart="onAddProductToCart" @onProductDetails="onProductDetails" />
				</div>
				<v-container fluid class="text-xs-center" v-if="(filteredProducts.length !== 0 && filteredProducts.length > maxElementsToShow) || (foundProducts.length > maxElementsToShow && filteredProducts.length === 0)">
					<v-pagination class="pagination" :length.number="paginationLengthProducts" @input="scrollToResults" v-model="pageNumProducts" :total-visible="7"></v-pagination>
				</v-container>
			</v-container>
		</div>


		<!-- Details Dialog -->
		<product-details-dialog :dialogDetailsOpen="dialogDetailsOpen" :curProductDetails="curProductDetails" @onCloseDetailsDialogClick="onCloseDetailsDialogClick" @onOpenAccessoryDialog="onOpenAccessoryDialog"></product-details-dialog>

		<!-- Acessory Details Dialog -->
		<accessory-details-dialog :dialogDetailsOpen="dialogDetailsAccessoryOpen" :curProductDetails="curProductAccessory" @onCloseDetailsDialogClick="onCloseDetailsAccessoryDialogClick"></accessory-details-dialog>

		<!-- Cart count Dialog -->
		<v-content v-if="dialogCartCountOpen" class="cart-count-container">
			<v-container fluid style="width:100%;height:100px;background-color:white;">
				<no-ssr>
					<v-dialog v-model="dialogCartCountOpen" :max-width="hasAnyAvailability() ? 650 : 450">
						<v-container row wrap align-center style="background-color:white;">
							<div v-if="hasAnyAvailability()">
								<v-flex v-if="cartGroupData.length">
									<v-flex row class="text-xs-center" style="margin-bottom:20px">
										<h2 style="text-align:center; padding: 15px;">Производител</h2>
									</v-flex>
									<v-flex row class="text-xs-center" style="margin-bottom:10px">
										<div class="group-card"
											 v-for="group in cartGroupData"
											 @click="toggleSelectCartGroup(group)"
											 v-bind:class="{
											selected: selectedCartGroup === group.GoodId,
											disabled: !groupHasAvailability(group)
										}">
											{{ group.Group }} - {{ round(group.Price) }}лв.
										</div>
									</v-flex>
								</v-flex>

								<v-flex v-if="selectedCartGroup !== null">
									<v-flex row class="text-xs-center" style="margin-bottom:20px">
										<h2 style="text-align:center; padding: 15px;">Сервиз</h2>
									</v-flex>
									<v-flex row class="text-xs-center" style="margin-bottom:10px">
										<div v-for="group in cartGroupData"
											 v-if="group.GoodId === selectedCartGroup">
											<div class="group-card"
												 v-for="(quantity, store)  in group.StoreQUantities"
												 @click="quantity !== 0 && toggleSelectCartStore(group, store)"
												 v-bind:class="{
												selected: selectedCartStore === store,
												disabled: quantity === 0
											}">
												{{ store }} - {{ quantity }}бр.
											</div>
										</div>
									</v-flex>
								</v-flex>

								<!--<v-flex row class="text-xs-center" style="margin-bottom:20px">-->
									<!--<h2 style="text-align:center; padding: 15px;">Количество</h2>-->
								<!--</v-flex>-->
								<!--<v-flex row class="text-xs-center" style="margin-bottom:10px">-->
									<!--<v-btn color="primary" icon flat @click="decreaseCartCount">-->
										<!--<v-icon>mdi-minus</v-icon>-->
									<!--</v-btn>-->
									<!--<input type="number" min="1" step="1" name="cartCount" v-model="cartCount" style="display: inline-block; width: 50px; text-align: center; font-size: 20px;"></input>-->
									<!--<v-btn color="primary" icon flat @click="increaseCartCount">-->
										<!--<v-icon>mdi-plus</v-icon>-->
									<!--</v-btn>-->
								<!--</v-flex>-->
							</div>
							<div v-else>
								<v-flex row class="text-xs-center" style="margin-bottom:20px">
									<h2 style="text-align:center; padding: 15px;">Наличност</h2>
								</v-flex>
								<v-flex row style="margin-bottom:20px">
									Този продукт не е в наличност. Можете да се свържете с нас от <a
										target="_blank"
										href="http://www.glassgoldgroup.eu/%D0%B0%D0%B2%D1%82%D0%BE%D1%81%D1%82%D1%8A%D0%BA%D0%BB%D0%B0-%D0%BE%D1%84%D0%B8%D1%81-%D1%81%D0%BE%D1%84%D0%B8%D1%8F-%D1%81%D0%BA%D0%BB%D0%B0%D0%B4-%D0%BF%D0%BB%D0%BE%D0%B2%D0%B4%D0%B8%D0%B2">тук</a>.
								</v-flex>

							</div>
							<v-flex style="display:flex;" v-if="hasAnyAvailability()">
								<v-btn color="primary" flat @click="dialogCartCountOpen = false">
									<v-icon left>mdi-close</v-icon>
									Затвори
								</v-btn>
								<v-spacer></v-spacer>
								<v-btn color="primary" v-bind:disabled="selectedCartGroup === null || selectedCartStore === null" @click="onAddCartCountDialogClick" v-if="hasAnyAvailability()">
									<v-icon left>fa-cart-plus</v-icon>
									Добави
								</v-btn>
							</v-flex>
							<v-flex style="display:flex;" v-else>
								<v-spacer></v-spacer>
								<v-btn color="primary" flat @click="dialogCartCountOpen = false">
									<v-icon left>mdi-close</v-icon>
									Затвори
								</v-btn>
							</v-flex>
						</v-container>
					</v-dialog>
				</no-ssr>
			</v-container>
		</v-content>

	</v-content>
</template>

<script>
	import ProductCard from '~/components/ProductCard';
	import ProductDetailsDialog from '~/components/ProductDetailsDialog';
	import AccessoryDetailsDialog from '~/components/AccessoryDetailsDialog';
	import scrollTo from "~/utils/scrollTo";

	export default {
		components: {
			'product-card': ProductCard,
			'product-details-dialog': ProductDetailsDialog,
			'accessory-details-dialog': AccessoryDetailsDialog
		},
		data() {
			return {
				pageNumProducts: 1,
				maxElementsToShow: 6,
				dialogDetailsOpen: false,
				dialogCartCountOpen: false,
				curProductDetails: null,
				cartCount: 1,
				selectedCartGroup: null,
				selectedCartStore: null,
				currentCartProductToAdd: null,
				dialogDetailsAccessoryOpen: false,
				curProductAccessory: []
			};
		},
		computed: {
			token() {
				return this.$store.getters["modules/auth/getToken"];
			},
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
			},
			cartGroupData() {
				return this.$store.getters["modules/products/getCurrentObservedProductAvailability"];
			},
			productsAreFetched() {
				return this.$store.getters["modules/products/getProductsAreFetched"];
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
				this.currentCartProductToAdd = product;
				this.$store.dispatch("modules/products/getProductAvailability", { id: product.Id, token: this.token })
					.then(() => {
						this.dialogCartCountOpen = true;
					});
			},
			onProductDetails(product) {
				this.$store.dispatch("modules/products/getFullProduct", { product })
					.then(() => {
						this.curProductDetails = this.$store.getters["modules/products/getAllProducts"].find(prod => prod.Id === product.Id);
						this.dialogDetailsOpen = true;
					});
			},
			increaseCartCount() {
				if (this.cartCount < 1) {
					this.cartCount = 1;
				}
				else {
					this.cartCount++;
				}
			},
			decreaseCartCount() {
				if (this.cartCount > 1) {
					this.cartCount--;
				}
				else {
					this.cartCount = 1;
				}
			},
			onAddCartCountDialogClick() {
				let comp = this,
					product = {};
				product.item = JSON.parse(JSON.stringify(comp.currentCartProductToAdd));
				product.cartCount = ~~comp.cartCount;
				product.cartGroupData = JSON.parse(JSON.stringify(this.cartGroupData));
				product.selectedCartGroup = this.selectedCartGroup;
				product.selectedCartStore = this.selectedCartStore;
				comp.$store.dispatch("modules/cart/addItemToCart", {
					productToBeAdded: product,
					originalProduct: comp.currentCartProductToAdd
				});
				comp.cartCount = 1;
				comp.dialogCartCountOpen = false;
			},
			onCloseDetailsDialogClick(value) {
				this.dialogDetailsOpen = value;
			},
			toggleSelectCartGroup(group) {
				if (this.groupHasAvailability(group)) {
					if (this.selectedCartGroup === group.GoodId) {
						this.selectedCartGroup = null;
					}
					else {
						this.selectedCartGroup = group.GoodId;
					}
				}
			},
			toggleSelectCartStore(group, store) {
				if (this.groupHasAvailability(group)) {
					if (this.selectedCartStore === store) {
						this.selectedCartStore = null;
					}
					else {
						this.selectedCartStore = store;
					}
				}
			},
			groupHasAvailability(group) {
				let quantities = 0;

				for (const store in group.StoreQUantities) {
					const storeQuantity = group.StoreQUantities[store];
					quantities += storeQuantity;
				}

				return quantities >= 0;
			},
			hasAnyAvailability() {
				for (const group of this.cartGroupData) {
					if (this.groupHasAvailability(group) >= 0) {
						return true;
					}
				}
				return false;
			},
			onCloseDetailsAccessoryDialogClick(value) {
				this.dialogDetailsAccessoryOpen = value;
				this.curProductAccessory = [];
			},
			onOpenAccessoryDialog(accessory) {
				this.$store.dispatch("modules/products/getAccessory", accessory)
					.then(() => {
						this.curProductAccessory = this.$store.getters["modules/products/getCurrentlyObservedProductAcessory"];
						return this.$store.dispatch("modules/products/getAccessoryAvailabilty", { id: this.curProductAccessory.Id, token: this.token });
					})
					.then(() => {
						this.dialogDetailsAccessoryOpen = true;
					});
			},
			round: num => num.toFixed(2)
		},
		watch: {
			filteredProducts(val, old) {
				if (val.length !== old.length) {
					this.pageNumProducts = 1;
				}
			},
			dialogCartCountOpen(value) {
				if (value === false) {
					this.cartCount = 1;
					this.selectedCartGroup = null;
					this.selectedCartStore = null;
					this.currentCartProductToAdd = null;
				}
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

	.products-container .products {
		grid-area: products;
		display: grid;
		margin: 0 auto;
		padding: 0;
	}

	.products-container .all-products {
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(350px, 1fr) );
		grid-column-gap: 40px;
		grid-row-gap: 40px;
		margin: 0;
		padding: 0;
	}

	.cart-count-container {
		background-color: #F1F1F1;
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

	.group-card {
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: 10px;
		margin: 5px;
		will-change: background-color, opacity, box-shadow;
		transition: background-color .3s cubic-bezier(0, .5, 0, .5), opacity .3s cubic-bezier(0, .5, 0, .5), box-shadow .3s cubic-bezier(0, .5, 0, .5);
	}

	.group-card:hover {
		cursor: pointer;
		background-color: #f0f0f0;
	}

	.group-card.disabled {
		opacity: .3;
		cursor: not-allowed;
		background-color: #fff !important;
	}

	.group-card.selected {
		background-color: rgba(0, 100, 0, .15) !important;
		border-color: darkgreen;
		box-shadow: 0 3px 3px rgba(0,0,0, .2);
	}

	@media all and (max-width: 992px) {
		.products-container {
            padding: 0 200px;
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
