<template>
	<v-switch v-model="value" :label="label" @change="updateValue" color="primary"></v-switch>
</template>

<script>

	export default {
		name: 'VuexSwitch',
		props: ["model", "label"],
		data() {
			return {
				value: false
			};
		},
		methods: {
			updateValue(value) {
				this.$emit('change', value);
			}
		},
		watch: {
			model(value) {
				this.value = value;
			}
		},
		created() {
			this.value = !!this.model;
		}
	};
</script>

<style lang="css" scoped>
</style>
