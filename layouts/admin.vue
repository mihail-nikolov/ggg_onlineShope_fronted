<template>
	<v-app id="inspire">
		<v-navigation-drawer
			permanent
			absolute
			class="admin__drawer"
		>
			<v-toolbar flat class="transparent">
				<v-list class="pa-0">
					<v-list-tile>
						<v-list-tile-content>
							{{ u }}
							{{ userName }}
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-toolbar>

			<v-list class="admin__drawer__list-container" dense>
				<v-divider style="flex: 0"></v-divider>

				<v-list-tile class="admin__drawer__item" ripple nuxt-link to="/admin/profile">
					<v-list-tile-action>
						<v-icon>person</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>
								Профил
						</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile class="admin__drawer__item" ripple nuxt-link to="/admin/change-password">
					<v-list-tile-action>
						<v-icon>fingerprint</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>Смени парола</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile class="admin__drawer__item" ripple nuxt-link to="/admin/change-address">
					<v-list-tile-action>
						<v-icon>location_on</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>Смени адрес</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>

				<v-list-tile class="admin__drawer__item" ripple nuxt-link to="/admin/orders">
					<v-list-tile-action>
						<v-icon>format_list_numbered_rtl</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>Поръчки</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>

				<v-list-tile class="admin__drawer__item" ripple nuxt-link to="/admin/users">
					<v-list-tile-action>
						<v-icon>account_circle</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>Потребители</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>

				<v-spacer></v-spacer>

				<v-divider style="flex: 0"></v-divider>

				<v-list-tile class="admin__drawer__item" ripple nuxt-link to="/">
					<v-list-tile-action>
						<v-icon>subdirectory_arrow_left</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>Към магазина</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>

				<v-list-tile class="admin__drawer__item" ripple @click="onLogoutClick">
					<v-list-tile-action>
						<v-icon>close</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>Изход</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-content id="main-content">
			<v-layout justify-center align-center>
				<nuxt/>
			</v-layout>
		</v-content>
		<snack-bar></snack-bar>
		<loading v-if="isLoadingActive"></loading>
	</v-app>
</template>

<script>
	import Snackbar from '~/components/Snackbar';
	import Loading from '~/components/Loading.vue';

	export default {
		components: {
			'loading': Loading,
			'snack-bar': Snackbar
		},
		mounted() {
			this.$store.dispatch('modules/auth/autoLogin');
		},
		data() {
			return {
				u: {}
			};
		},
		computed: {
			user() {
				return this.$store.getters["modules/auth/getUserDetails"];
			},
			userName() {
				if (this.user) {
					return this.user.Name || this.user.Email;
				}

				return "";
			},
			isLoadingActive() {
				return this.$store.getters["modules/general/isLoadingActive"];
			}
		},
		watch: { },
		methods: {
			onLogoutClick(e) {
				this.$store.dispatch("modules/auth/logout");
			}
		}
	};
</script>

<style lang="css" scoped>
	#main-content {
		padding-left: 300px;
	}
	.admin__drawer {
		display: flex;
		flex-direction: column;
		padding-bottom: 8px;
	}
	.admin__drawer__list-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.list__tile--active {
		background: red;
	}
</style>
