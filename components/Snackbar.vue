<template>
	<div class="snackbar">
		<v-snackbar v-model="show" :timeout="snackbarTimeout" :color="status">{{ message }}</v-snackbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				snackbarTimeout: 3000,
				show: false,
				message: '',
				status: ''
			};
		},
		computed: {
			notification() { 
				return this.$store.getters["modules/general/getSnackbarNotification"];
			}
		},
		watch: {
			notification() {
				if (this.notification.length > 0) {
					this.message = this.notification[0].message;
					this.status = this.notification[0].status;
					this.show = true;
				}
			},
			show(value) {
				if (!value) {
					this.clearNotification();
				}
			}
		},
		methods: {
			clearNotification() {
				this.status = '';
				this.message = '';
				this.$store.dispatch("modules/general/clearSnackbarNotification");
			}
		}
	};
</script>

<style type="text/css" scoped>
	.snackbar {
		width: 100%;
	}
</style>
