<template>
	<v-container class="index-page">
		<search-component/>
		<products-component/>
	</v-container>
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
	.search-results {
		width: 90vw;
	}
</style>
