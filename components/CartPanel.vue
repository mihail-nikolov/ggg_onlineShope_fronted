<template>

</template>

<script>
	export default {
		name: 'CartPanel',
		data() {
			return {
			};
		},
		computed: {
			addedItemsToCart() {
				return this.$store.getters["modules/cart/getCartItems"];
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

</style>
