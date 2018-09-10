<template>
	<v-card class="admin__card" style="margin-top: 50px">
		<v-btn flat nuxt-link to="/my/change-password"><v-icon>fingerprint</v-icon>Смени парола</v-btn>
		<v-btn flat nuxt-link to="/my/change-address"><v-icon>location_on</v-icon>Смени адрес</v-btn>
		<v-btn flat nuxt-link to="/my/orders"><v-icon>format_list_numbered_rtl</v-icon>Поръчки</v-btn>
		<v-btn flat nuxt-link to="/my/users"><v-icon>account_circle</v-icon>Потребители</v-btn>
	</v-card>
</template>

<script>
	export default {
		name: "adminNavigationButtons"
	};
</script>

<style scoped>

</style>