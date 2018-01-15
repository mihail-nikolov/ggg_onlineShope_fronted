<template>
	<div>
		<v-toolbar absolute :color="color" dark>
			<v-toolbar-side-icon></v-toolbar-side-icon>
			<v-toolbar-title>{{description}}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>search</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>favorite</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>more_vert</v-icon>
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>
export default {
	props: ['description', 'color']
};
</script>

<style lang="css" scoped>

</style>
