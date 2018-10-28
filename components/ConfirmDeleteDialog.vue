<template>
	<v-content v-if="openDialog">
		<v-container fluid style="width: 100%;height: 100px;">
			<no-ssr>
				<v-dialog v-model="openDialog" max-width="500" max-height="450">
					<v-card class="dialog-container">
						<v-container fluid grid-list-sm>
							<h1 class="text-center">Изтрии акаунт</h1>
							<p class="text-center">Сигурни ли сте, че искате да изтриете този акаунт?</p>
							<v-container style="display: flex; padding: 0; margin-top: 50px; padding-top: 20px;">
								<v-spacer></v-spacer>
								<v-btn flat @click="openDialog = false">Не</v-btn>
								<v-btn color="error" @click="submit()">Да</v-btn>
							</v-container>
						</v-container>
					</v-card>
				</v-dialog>
			</no-ssr>
		</v-container>
	</v-content>
</template>

<script>
	export default {
		name: 'ConfirmDeleteDialog',
		props: ['isOpen'],
		data() {
			return {
				openDialog: false
			};
		},
		methods: {
			submit() {
				this.$emit("submit", true);
				this.openDialog = false;
			}
		},
		watch: {
			isOpen(value) {
				this.openDialog = value;
			},
			openDialog(value) {
				if (value === false) {
					this.$emit("onClose", this.openDialog);
				}
			}
		}
	};
</script>

<style lang="css" scoped>
	.dialog-container {
		padding: 20px;
		text-align: center;
	}
</style>
