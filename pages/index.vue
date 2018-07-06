<template>
	<v-content class="index-page">
		<search-component/>
		<products-component/>
	</v-content>
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
		width: calc(100% - 60px);
	}
</style>
