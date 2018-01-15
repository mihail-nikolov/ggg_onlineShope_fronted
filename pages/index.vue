<template>
	<section class="container">
		<search-component/>
		<products-component/>
	</section>
</template>

<script>
	import SearchComponent from '~/components/SearchComponent.vue';
	import ProductsComponent from '~/components/ProductsComponent.vue';
	export default {
		layout: 'complex',
		components: {
			SearchComponent,
			ProductsComponent
		}
	};
</script>

<style scoped>
	.container {
		margin-top: 50px;
	}
</style>
