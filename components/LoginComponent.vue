<template>
	<div>
		<v-form>
			<form-component elemType="email" v-model="email" fieldName="Email" :hasError="validation.hasError('email')" :firstError="validation.firstError('email')"></form-component>
			<form-component elemType="password" v-model="password" fieldName="Password" :hasError="validation.hasError('password')" :firstError="validation.firstError('password')"></form-component>
			<button type="button" class="button buttonBlue" @click="onSubmit">Login
				<div class="ripples buttonRipples" v-bind:class="{ 'is-active': isButtonClicked }">
					<span class="ripplesCircle" v-bind:style="{ top: circleY, left: circleX }"></span>
				</div>
			</button>
			<nuxt-link to="/register">
				<v-btn flat light>Sign up</v-btn>
			</nuxt-link>
		</v-form>
		<snack-bar></snack-bar>
	</div>
</template>

<script>
	import SimpleVueValidation from 'simple-vue-validator';
	import FormInputComponent from '~/components/Form/FormInputComponent';
	import Snackbar from '~/components/Snackbar';
	const Validator = SimpleVueValidation.Validator;
	export default {
		name: 'LoginComponent',
		components: {
			'snack-bar': Snackbar,
			'form-component': FormInputComponent
		},
		data() {
			return {
				isEmailUsed: false,
				isPasswordUsed: false,
				isButtonClicked: false,
				email: '',
				password: '',
				circleX: '0px',
				circleY: '0px'
			};
		},
		methods: {
			onSubmit(e) {
				let comp = this;
				if (!comp.isButtonClicked) {
					comp.isButtonClicked = true;
					comp.circleX = e.pageX - (e.pageX - e.offsetX) + 'px';
					comp.circleY = e.pageY - (e.pageY - e.offsetY) + 'px';
					setTimeout(function() {
						comp.isButtonClicked = false;
					}, 400);
				}
				comp.$validate()
					.then(function(success) {
						if (success) {
							console.log("val success");
							comp.$store.dispatch("modules/auth/login", {
								email: comp.email,
								password: comp.password
							}).then(function(response) {
								if (response && response.status === 'success') {
									comp.$store.dispatch("modules/general/setSnackbarNotification", {
										message: response.message,
										status: response.status
									});
									setTimeout(function () {
										comp.$nuxt.$router.push({ path: `/` });
									}, 1500);
								} else if (response && response.status === 'error') {
									comp.email = '';
									comp.password = '';
									comp.$store.dispatch("modules/general/setSnackbarNotification", {
										message: response.message,
										status: response.status
									});
								}
							});
						} else {
							console.log("val error");
							comp.email = '';
							comp.password = '';
							comp.$store.dispatch("modules/general/setSnackbarNotification", {
								message: "Login unsuccessfull! Please fill in all the required fields and try again.",
								status: "error"
							});
						}
					});
			}
		},
		validators: {
			email(value) {
				return Validator.value(value).required().email();
			},
			password(value) {
				return Validator.value(value).required();
			}
		},
		watch: {
			isButtonClicked() {
				// console.log("isButtonClicked", this.isButtonClicked);
			}
		}
	};
</script>

<style lang="css" scoped>
	* {
		box-sizing: border-box;
	}
	
	body {
		font-family: Helvetica;
		background: #eee;
		-webkit-font-smoothing: antialiased;
	}
	
	h1,
	h3 {
		font-weight: 300;
	}
	
	h1 {
		color: #636363;
	}
	
	h3 {
		color: #37474F;
	}
	
	form {
		width: 580px;
		margin: 4em auto;
		padding: 3em 2em 2em 2em;
		background: #fafafa;
		border: 1px solid #ebebeb;
		box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px, rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;
	}
	
	.group {
		position: relative;
		margin-bottom: 45px;
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
	
	input:focus ~ label,
	input.used ~ label {
		top: -20px;
		transform: scale(.75);
		left: -3px;
		/* font-size: 14px; */
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
	/* Button */
	
	.button {
		position: relative;
		display: inline-block;
		padding: 12px 24px;
		margin: .3em 0 1em 0;
		width: 100%;
		vertical-align: middle;
		color: #fff;
		font-size: 16px;
		line-height: 20px;
		-webkit-font-smoothing: antialiased;
		text-align: center;
		letter-spacing: 1px;
		background: transparent;
		border: 0;
		border-bottom: 2px solid #37474f;
		cursor: pointer;
		transition: all 0.15s ease;
	}
	
	.button:focus {
		outline: 0;
	}
	/* Button modifiers */
	
	.buttonBlue {
		background: #37474F;
		text-shadow: 1px 1px 0 rgba(39, 110, 204, .5);
	}
	
	.buttonBlue:hover {
		background: #4f5d64;
	}
	/* Ripples container */
	
	.ripples {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: transparent;
	}
	/* Ripples circle */
	
	.ripplesCircle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.25);
	}
	
	.ripples.is-active .ripplesCircle {
		animation: ripples .4s ease-in;
	}
	/* Ripples animation */
	
	@keyframes ripples {
		0% {
			opacity: 0;
		}
		25% {
			opacity: 1;
		}
		100% {
			width: 200%;
			padding-bottom: 200%;
			opacity: 0;
		}
	}
</style>
