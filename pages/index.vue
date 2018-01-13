<template>
	<section class="container">
		<img src="./../static/header/header_big1.png" alt="Glass Gold Group header image" class="header-image">
		<div class="search-component">
			<search-component></search-component>
		</div>
	</section>
</template>

<script>
	import SearchComponent from './../components/SearchComponent.vue';
	export default {
		layout: 'default',
		components: {
			SearchComponent
		}
	};
</script>

<style scoped>
	.header-image {
		width: 100vw;
		vertical-align: bottom;
	}

	.search-component {
		margin-top: 150px;
	}
</style>
