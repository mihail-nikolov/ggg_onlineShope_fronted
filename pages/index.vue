<template>
	<section class="container">
		<!-- <img src="./../static/header/header_big1.png" alt="Glass Gold Group header image" class="header-image"> -->
		<search-component/>
		<products-component/>
	</section>
</template>

<script>
	import SearchComponent from '~/components/SearchComponent.vue';
	import ProductsComponent from '~/components/ProductsComponent.vue';
	export default {
		layout: 'default',
		components: {
			SearchComponent,
			ProductsComponent
		}
	};
</script>

<style scoped>
	.header-image {
		width: 100vw;
		vertical-align: bottom;
	}
</style>
