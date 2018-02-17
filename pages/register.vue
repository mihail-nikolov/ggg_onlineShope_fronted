<template>
	<v-container class="register-page">
		<register-component/>
	</v-container>
</template>

<script>
	import RegisterComponent from '~/components/RegisterComponent';
	export default {
		layout: 'default',
		components: {
			RegisterComponent
		}
	};
</script>

<style scoped>
	
</style>
