<template>
	<v-form style="margin: 0; width: 100%; background-color: #fafafa; padding: 20px;">
		<div v-if="showSuccessMessage === false">
			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="name" fieldName="Име" :hasError="validation.hasError('name')" :firstError="validation.firstError('name')"></form-component>
			<form-component @onKeyUp="onKeyUp" elemType="email" v-model="email" fieldName="Имеил" :hasError="validation.hasError('email')" :firstError="validation.firstError('email')"></form-component>
			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="phone" fieldName="Телефон" :hasError="validation.hasError('phone')" :firstError="validation.firstError('phone')"></form-component>

			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="make" fieldName="Марка" :hasError="validation.hasError('make')" :firstError="validation.firstError('make')"></form-component>
			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="model" fieldName="Модел" :hasError="validation.hasError('model')" :firstError="validation.firstError('model')"></form-component>
		  <form-component @onKeyUp="onKeyUp" elemType="text" v-model="modelYear" fieldName="Година" :hasError="validation.hasError('modelYear')" :firstError="validation.firstError('modelYear')"></form-component>
			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="body" fieldName="Тип каросерия и брой врати" :hasError="validation.hasError('body')" :firstError="validation.firstError('body')"></form-component>
			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="productType" fieldName="Тип Продукт" :hasError="validation.hasError('productType')" :firstError="validation.firstError('productType')"></form-component>
			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="vin" fieldName="Номер на рама" :hasError="validation.hasError('vin')" :firstError="validation.firstError('vin')"></form-component>

			<form-component @onKeyUp="onKeyUp" elemType="text" v-model="description" fieldName="Описание" :hasError="validation.hasError('description')" :firstError="validation.firstError('description')"></form-component>
			<input type="checkbox" value="true" v-model="enquireToRuse"><label for="enquireToRuse">Запитване Русе</label>
			<input type="checkbox" value="true" v-model="enquireToSofia"><label for="enquireToSofia">Запитване София</label>
			</br>
			<v-layout row>
				<v-spacer></v-spacer>
				<v-btn primary @click="onSubmit">Изпрати Запитване</v-btn>
			</v-layout>
		</div>
		<div v-else style="padding: 20px; text-align: center">
			<h2>Вашето запитване е изпратено успешно!</h2>
			<p>Ще се свържем с Вас възможно най-скоро.</p>
		</div>
	</v-form>
</template>

<script>
	import SimpleVueValidation from 'simple-vue-validator';
	import FormInputComponent from '~/components/Form/FormInputComponent';
	import baseRepository from "~/repositories/baseRepository";
	const Validator = SimpleVueValidation.Validator;

	export default {
		name: 'RequestDialog',
		components: {
			'form-component': FormInputComponent
		},
		data() {
			return {
				name: "",
				email: "",
				phone: "",
				make: "",
				model: "",
				modelYear: "",
				body: "",
				productType: "",
				vin: "",
				description: "",
				enquireToRuse: false,
				enquireToSofia: false,
				showSuccessMessage: false
			};
		},
		methods: {
			onKeyUp(e) {
				if (e.key === 'Enter') {
					this.onSubmit();
				}
			},

			onSubmit() {
				const model = {
					Name: this.name,
					Email: this.email,
					Phone: this.phone,
					Make: this.make,
					Model: this.model,
					ModelYear: this.modelYear,
					Body: this.body,
					ProductType: this.productType,
					VIN: this.vin,
					Description: this.description,
					EnquireToRuse: this.enquireToRuse,
					EnquireToSofia: this.enquireToSofia
				};

				this.$validate()
					.then((success) => {
						if (success) {
							baseRepository.post('Products/CheckAvailability', model).catch();
							this.showSuccessMessage = true;
							setTimeout(() => {
								this.$emit("onClose");
							}, 3000);
						}
					});
			}
		},
		validators: {
			email(value) {
				return Validator.value(value).required().email();
			}
		}
	};
</script>

<style lang="css" scoped>
</style>
