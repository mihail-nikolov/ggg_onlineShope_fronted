<template>
	<div class="group">
		<input :type="elemType" v-bind:value="value" v-on:input="updateValue($event.target.value)" @blur="onBlur" v-bind:class="{ used: isUsed }" v-on:keyup="emitKeyUpEvent">
		<span class="highlight"></span>
		<span class="bar"></span>
		<label :class="{errorVal: hasError}">{{fieldName}} {{firstError}}</label>
	</div>
</template>

<script>
	export default {
		name: 'FormInputComponent',
		props: ['elemType', 'value', 'fieldName', 'hasError', 'firstError'],
		data() {
			return {
				isUsed: false,
				currentModel: '',
				originalPassword: ''
			};
		},
		methods: {
			onBlur() {
				if (this.value) this.isUsed = true;
				else this.isUsed = false;
			},
			updateValue(value) {
				this.$emit('input', value);
			},
			emitKeyUpEvent(e) {
				this.$emit('onKeyUp', e);
			}
		}
	};
</script>

<style lang="css" scoped>
	.group {
		position: relative;
		margin-bottom: 35px;
	}
	
	input {
		font-size: 18px;
		padding: 10px 10px 10px 5px;
		-webkit-appearance: none;
		display: block;
		background: #fafafa;
		color: #636363;
		width: 100%;
		border: none;
		border-radius: 0;
		border-bottom: 1px solid #757575;
	}
	
	input:focus {
		outline: none;
	}
	/* Label */
	
	label {
		color: #999;
		font-size: 18px;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		left: 5px;
		top: 10px;
		transition: all 0.2s ease;
	}
	/* active */
	
	input {
		-webkit-transition: font-size 0.2s;
		transition: font-size 2s;
	}
	
	input:focus ~ label,
	input.used ~ label {
		top: -20px;
		left: 5px;
		font-size: 14px;
		color: #37474F;
	}
	/* Underline */
	
	.bar {
		position: relative;
		display: block;
		width: 100%;
	}
	
	.bar:before,
	.bar:after {
		content: '';
		height: 2px;
		width: 0;
		bottom: 1px;
		position: absolute;
		background: #37474F;
		transition: all 0.2s ease;
	}
	
	.bar:before {
		left: 50%;
	}
	
	.bar:after {
		right: 50%;
	}
	/* active */
	
	input:focus ~ .bar:before,
	input:focus ~ .bar:after {
		width: 50%;
	}
	/* Highlight */
	
	.highlight {
		position: absolute;
		height: 60%;
		width: 100px;
		top: 25%;
		left: 0;
		pointer-events: none;
		opacity: 0.5;
	}
	/* active */
	
	input:focus ~ .highlight {
		animation: inputHighlighter 0.3s ease;
	}
	/* Animations */
	
	@keyframes inputHighlighter {
		from {
			background: #37474F;
		}
		to {
			width: 0;
			background: transparent;
		}
	}
	
	.errorVal {
		color: #FF5252 !important;
		background-color: transparent !important;
	}
</style>
