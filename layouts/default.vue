<template>
	<v-app id="inspire">
		<v-navigation-drawer stateless fixed v-model="drawerRight" temporary right clipped app width="700" style="background-color:#FAFAFA">
			<cart-panel @slideDrawerOut="slideDrawerOut" @cartPanelDetailsButtonClicked="cartPanelDetailsButtonClicked"></cart-panel>
		</v-navigation-drawer>
		<v-toolbar color="blue-grey darken-3" dark fixed app clipped-right>
			<a v-bind:href="homeLink" class="logo-img" title="Glass Gold Group: Homepage"></a>
			<nuxt-link to="/"><v-btn flat dark>Search</v-btn></nuxt-link>
			<nuxt-link to="/about"><v-btn flat dark>About</v-btn></nuxt-link>
			<nuxt-link to="/contact"><v-btn flat dark>Contact</v-btn></nuxt-link>
			<nuxt-link to="/"><v-btn v-if="isLoggedIn" flat dark @click="onLogoutClick">Logout</v-btn></nuxt-link>
			<nuxt-link to="/login"><v-btn v-if="!isLoggedIn" flat dark>Login</v-btn></nuxt-link>
			<v-spacer></v-spacer>
			<v-btn flat icon @click="onCartClick" :disabled="!addedItemsToCartCount">
				<v-badge left bottom origin>
					<span slot="badge">{{addedItemsToCartCount}}</span>
					<v-icon>shopping_cart</v-icon>
				</v-badge>
			</v-btn>
		</v-toolbar>
		<v-content id="main-content">
			<v-container fluid fill-height>
				<v-layout justify-center align-center>
					<nuxt/>
					<product-details-dialog :dialogDetailsOpen="dialogDetailsOpen" :curProductDetails="curProductDetails" @onCloseDetailsDialogClick="onCloseDetailsDialogClick"></product-details-dialog>
				</v-layout>
			</v-container>
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
	export default {
		components: {
			'cart-panel': CartPanel,
			'loading': Loading,
			'snack-bar': Snackbar,
			'product-details-dialog': ProductDetailsDialog
		},
		mounted() {
			this.$store.dispatch('modules/auth/autoLogin');
		},
		data() {
			return {
				drawerRight: false,
				homeLink: "http://www.glassgoldgroup.eu/",
				dialogDetailsOpen: false,
				curProductDetails: []
			};
		},
		props: {
			source: String
		},
		computed: {
			isLoggedIn () {
				return this.$store.getters["modules/auth/isLoggedIn"];
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
				this.curProductDetails = product.item;
				this.dialogDetailsOpen = true;
			},
			onCloseDetailsDialogClick(value) {
				this.dialogDetailsOpen = value;
				this.curProductDetails = [];
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
