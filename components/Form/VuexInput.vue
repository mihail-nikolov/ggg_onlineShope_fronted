<template>
	<input type="text" v-bind:style="styles" v-model="value" @keyup="updateValue(~~$event.target.value)"></input>
</template>

<script>

	export default {
		name: 'VuexSwitch',
		props: ["model", "styles"],
		data() {
			return {
				value: ""
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
			console.log(this.model);
			this.value = this.model;
		}
	};
</script>

<style lang="css" scoped>
</style>
