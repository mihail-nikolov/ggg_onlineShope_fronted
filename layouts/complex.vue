<template>
	<v-app id="inspire">
		<v-navigation-drawer fixed v-model="drawerRight" :stateless="right" right clipped app>
			<v-list dense>
				<v-list-tile @click.stop="right = !right">
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar color="blue-grey" dark fixed app clipped-right>
			<a v-bind:href="homeLink" class="logo-img" title="Автостъкла Glass Gold Group: Homepage"></a>
			<v-toolbar-title>Search</v-toolbar-title>
			<v-toolbar-title>About</v-toolbar-title>
			<v-toolbar-title>Contact</v-toolbar-title>
			<v-toolbar-title>Login</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-icon @click.stop="drawerRight = !drawerRight">shopping_cart</v-icon>
		</v-toolbar>
		<v-content>
			<v-container fluid fill-height>
				<v-layout justify-center align-center>
					<nuxt/>
				</v-layout>
			</v-container>
		</v-content>
		<v-navigation-drawer right temporary v-model="right" fixed></v-navigation-drawer>
		<v-footer color="blue-grey" class="white--text" app>
			<span>Gold Glass Group</span>
			<v-spacer></v-spacer>
			<span>&copy; 2018</span>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data: () => ({
			drawer: null,
			drawerRight: null,
			right: null,
			left: null,
			homeLink: "http://www.glassgoldgroup.eu/"
		}),
		props: {
			source: String
		}
	};
</script>

<style lang="css" scoped>
	.logo-img {
		display: inline-block;
		background-image: url('./../static/logo/logo.png');
		background-repeat: no-repeat;
		width: 110px;
		background-position-y: center;
		height: 40px;
		justify-content: flex-start;
	}
	.logo-img:hover {
		cursor: pointer;
	}
</style>
