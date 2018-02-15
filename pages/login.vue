<template>
	<div>
		<login-component/>
	</div>
</template>

<script>
	import LoginComponent from '~/components/LoginComponent';
	export default {
		layout: 'default',
		components: {
			LoginComponent
		},
		computed: {
			isLoggedIn() {
				return this.$store.getters["modules/auth/isLoggedIn"];
			}
		},
		watch: {
			isLoggedIn(value) {
				if (value) {
					setTimeout(() => {
						this.$nuxt.$router.push({ path: `/` });
					}, 1500);
				}
			}
		}
	};
</script>

<style scoped>
	
</style>
