<template>
	<div class="snackbar">
		<v-snackbar v-model="show" :timeout="0" :color="status">{{ message }}</v-snackbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				snackbarTimeout: 6000,
				show: false,
				message: '',
				status: '',
				timer: 0
			};
		},
		computed: {
			notification() { 
				return this.$store.getters["modules/general/getSnackbarNotification"];
			}
		},
		watch: {
			notification() {
				let comp = this;
				if (comp.timer) {
					clearTimeout(comp.timer);
					comp.timer = 0;
				}
				if (comp.notification.length > 0) {
					comp.message = comp.notification[0].message;
					comp.status = comp.notification[0].status;
					comp.show = true;
					comp.timer = setTimeout(() => {
						comp.show = false;
					}, comp.snackbarTimeout);
				} else {
					comp.show = false;
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
		},
		mounted() {
			console.log("mount");
		}
	};
</script>

<style type="text/css" scoped>
	.snackbar {
		width: 100%;
	}
</style>
