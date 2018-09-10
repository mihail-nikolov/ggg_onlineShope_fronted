<template>
	<v-container class="login-page">
		<login-component/>
	</v-container>
</template>

<script>
	import LoginComponent from '~/components/LoginComponent';
	export default {
		layout: 'default',
		components: {
			LoginComponent
		}
	};
</script>

<style scoped>
	
</style>
