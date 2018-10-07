<template>
	<div style="margin: 0 8px;">
		<span v-for="(value, index) in options">
			<span class="switch-button" @click="onSelect(value)" v-bind:class="{active: value == model}">{{ value }}</span>
			<span v-if="index !== options.length - 1">/</span>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'SwitchGroup',
		props: {
			options: Array,
			model: String
		},
		methods: {
			onSelect(value) {
				this.$emit('onSelect', value);
			}
		}
	};
</script>

<style lang="css" scoped>
	.switch-button {
		padding: 8px;
		text-transform: uppercase;
		position: relative;
		top: -3px;
		cursor: pointer;
	}
	.switch-button::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: transparent;
	}
	.switch-button.active::after {
		background: #37474F;
	}
	.switch-button:hover:not(.active)::after {
		background: #37474F;
		opacity: .3;
	}
</style>
