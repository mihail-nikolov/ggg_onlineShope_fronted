<template>
	<div>
		<search-component/>
		<products-component/>
	</div>
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
	
</style>
