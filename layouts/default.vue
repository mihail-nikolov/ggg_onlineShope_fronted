<template>
	<v-app id="inspire">
		<v-navigation-drawer stateless fixed v-model="drawerRight" temporary right clipped app width="700" style="background-color:#FAFAFA">
			<cart-panel @slideDrawerOut="slideDrawerOut" @cartPanelDetailsButtonClicked="cartPanelDetailsButtonClicked"></cart-panel>
		</v-navigation-drawer>
		<v-toolbar color="blue-grey darken-3" dark fixed app clipped-right>
			<a v-bind:href="homeLink" class="logo-img" title="Glass Gold Group: Homepage"></a>
			<nuxt-link to="/"><v-btn flat dark>Търсене</v-btn></nuxt-link>
			<nuxt-link to="/terms"><v-btn flat dark>Общи условия</v-btn></nuxt-link>
			<a href="http://www.glassgoldgroup.eu/%D0%B0%D0%B2%D1%82%D0%BE%D1%81%D1%82%D1%8A%D0%BA%D0%BB%D0%B0-%D0%BE%D1%84%D0%B8%D1%81-%D1%81%D0%BE%D1%84%D0%B8%D1%8F-%D1%81%D0%BA%D0%BB%D0%B0%D0%B4-%D0%BF%D0%BB%D0%BE%D0%B2%D0%B4%D0%B8%D0%B2">
        <v-btn flat dark>Контакти</v-btn>
      </a>

			<v-spacer></v-spacer>

			<nuxt-link to="/my/profile"><v-btn v-if="isLoggedIn" flat dark>{{ user.Name || user.Email }}</v-btn></nuxt-link>
			<nuxt-link to="/login"><v-btn v-if="!isLoggedIn" flat dark>Вход</v-btn></nuxt-link>
			<v-btn flat icon @click="onCartClick" :disabled="!addedItemsToCartCount" style="margin-right: 25px;">
				<v-badge right top color="green">
					<span slot="badge" v-if="addedItemsToCartCount">{{addedItemsToCartCount}}</span>
					<v-icon>shopping_cart</v-icon>
				</v-badge>
			</v-btn>
		</v-toolbar>
		<v-content id="main-content">
			<v-layout justify-center align-center>
				<nuxt/>
				<product-details-dialog :dialogDetailsOpen="dialogDetailsOpen" :curProductDetails="curProductDetails" @onCloseDetailsDialogClick="onCloseDetailsDialogClick" @onOpenAccessoryDialog="onOpenAccessoryDialog"></product-details-dialog>
				<accessory-details-dialog :dialogDetailsOpen="dialogDetailsAccessoryOpen" :curProductDetails="curProductAccessory" @onCloseDetailsDialogClick="onCloseDetailsAccessoryDialogClick"></accessory-details-dialog>
			</v-layout>
		</v-content>
		<v-footer color="blue-grey darken-3" class="white--text" fixed app>
			<span>Gold Glass Group&reg;</span>
			<v-spacer></v-spacer>
			<span>&copy; 2018</span>
		</v-footer>
		<snack-bar></snack-bar>
		<loading v-if="isLoadingActive"></loading>
	</v-app>
</template>

<script>
	import CartPanel from '~/components/CartPanel.vue';
	import Snackbar from '~/components/Snackbar';
	import Loading from '~/components/Loading.vue';
	import ProductDetailsDialog from '~/components/ProductDetailsDialog';
	import AccessoryDetailsDialog from '~/components/AccessoryDetailsDialog';

	export default {
		components: {
			'cart-panel': CartPanel,
			'loading': Loading,
			'snack-bar': Snackbar,
			'product-details-dialog': ProductDetailsDialog,
			'accessory-details-dialog': AccessoryDetailsDialog
		},
		mounted() {
			this.$store.dispatch('modules/auth/autoLogin');
		},
		data() {
			return {
				drawerRight: false,
				homeLink: "http://www.glassgoldgroup.eu/",
				dialogDetailsOpen: false,
				curProductDetails: [],
				dialogDetailsAccessoryOpen: false,
				curProductAccessory: []
			};
		},
		props: {
			source: String
		},
		computed: {
			isLoggedIn () {
				return this.$store.getters["modules/auth/isLoggedIn"];
			},
			user() {
				return this.$store.getters["modules/auth/getUserDetails"];
			},
			token() {
				return this.$store.getters["modules/auth/getToken"];
			},
			isLoadingActive() {
				return this.$store.getters["modules/general/isLoadingActive"];
			},
			addedItemsToCartCount() {
				let count = 0;
				this.$store.getters["modules/cart/getCartItems"].forEach(function(product) {
					count += product.cartCount;
				});
				return count;
			}
		},
		watch: {
			addedItemsToCartCount(value) {
				if (value === 0) {
					this.drawerRight = false;
				}
			}
		},
		methods: {
			onCartClick() {
				if (this.addedItemsToCartCount) {
					this.drawerRight = !this.drawerRight;
				}
			},
			onLogoutClick(e) {
				this.$store.dispatch("modules/auth/logout");
			},
			slideDrawerOut() {
				this.drawerRight = false;
			},
			cartPanelDetailsButtonClicked(product) {
				if (product.item) {
					this.$store.dispatch("modules/products/getFullProduct", { product: product.item })
						.then(() => {
							this.curProductDetails = this.$store.getters["modules/products/getAllProducts"].find(prod => prod.Id === product.item.Id);
							this.dialogDetailsOpen = true;
						});
				}
			},
			onCloseDetailsDialogClick(value) {
				this.dialogDetailsOpen = value;
				this.curProductDetails = [];
			},
			onCloseDetailsAccessoryDialogClick(value) {
				this.dialogDetailsAccessoryOpen = value;
				this.curProductAccessory = [];
			},
			onOpenAccessoryDialog(accessory) {
				this.$store.dispatch("modules/products/getAccessory", accessory)
					.then(() => {
						this.curProductAccessory = this.$store.getters["modules/products/getCurrentlyObservedProductAcessory"];
						this.dialogDetailsAccessoryOpen = true;
					});
			}
		}
	};
</script>

<style lang="css" scoped>
	.logo-img {
		display: inline-block;
		background-image: url('./../static/logo/logo.png');
		background-repeat: no-repeat;
		width: 110px;
		background-position-y: center;
		height: 40px;
		justify-content: flex-start;
	}
	.logo-img:hover {
		cursor: pointer;
	}
	#main-content {
		background-size: cover;
		/*background-image: url("../static/car-generated.png");*/
	}

	v-toolbar, v-footer {
		/*color: #2a3943;*/
	}
</style>
