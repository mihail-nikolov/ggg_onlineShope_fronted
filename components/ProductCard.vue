<template>
	<div>
		<v-toolbar absolute :color="color" dark>
			<v-toolbar-title class="code">{{eurocode}}</v-toolbar-title>
			<v-toolbar-title>{{description}}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>build</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>camera_alt</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>add_shopping_cart</v-icon>
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>
export default {
	props: ['eurocode', 'description', 'color']
};
</script>

<style lang="css" scoped>
	.code {
		width: 200px;
		color: black;
	}
</style>
