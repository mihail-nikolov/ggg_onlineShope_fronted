<template>
    <v-container>
        <v-card class="admin__card">
            <h2 class="admin__title">Смени адрес</h2>
            <v-form class="form-wrapper">
              <form-component @onKeyUp="onKeyUp" :color="'white'" elemType="text" v-model="country" fieldName="Държава" :hasError="validation.hasError('country')" :firstError="validation.firstError('county')"></form-component>
              <form-component @onKeyUp="onKeyUp" :color="'white'" elemType="text" v-model="city" fieldName="Град" :hasError="validation.hasError('city')" :firstError="validation.firstError('city')"></form-component>
              <form-component @onKeyUp="onKeyUp" :color="'white'" elemType="text" v-model="address" fieldName="Адрес" :hasError="validation.hasError('address')" :firstError="validation.firstError('address')"></form-component>
              <form-component @onKeyUp="onKeyUp" :color="'white'" elemType="text" v-model="phoneNumber" fieldName="Телефонен Номер" :hasError="validation.hasError('phoneNumber')" :firstError="validation.firstError('phoneNumber')"></form-component>
              <v-layout row wrap>
                <v-spacer></v-spacer>
                <v-btn @click="onSubmit">Запази</v-btn>
              </v-layout>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
	import SimpleVueValidation from 'simple-vue-validator';
	import FormInputComponent from '~/components/Form/FormInputComponent';
	const Validator = SimpleVueValidation.Validator;

	export default {
		layout: 'my',
		data() {
			return {
				country: '',
				city: '',
        address: '',
        phoneNumber: ''
			};
		},
		components: {
			'form-component': FormInputComponent
		},
		computed: {
			user() {
				return this.$store.getters["modules/auth/getUserDetails"];
			}
		},
		methods: {
			onSubmit(e) {
				this.$validate()
					.then(success => {
						if (success) {
							this.$store.dispatch("modules/auth/changeUserAddress", {
								user: this.user,
								country: this.country,
								city: this.city,
                address: this.address,
                phoneNumber: this.phoneNumber
							});
						}
						else {
							this.$store.dispatch("modules/general/setSnackbarNotification", {
								message: "Грешка при смяна на адреса.",
								status: "error"
							});
							this.country = '';
							this.city = '';
              this.address = '';
              this.phoneNumber = '';
						}
					});
			},
			onKeyUp(e) {
				if (e.key === 'Enter') {
					this.onSubmit();
				}
			}
		},
		validators: {
			country(value) {
				return Validator.value(value).required();
			},
			city(value) {
				return Validator.value(value).required();
			},
			address(value) {
				return Validator.value(value).required();
      },
      phoneNumber(value) {
        return Validator.value(value).required();
      }
		}
	};
</script>

<style scoped>
    .admin__title {
        display: flex;
        font-size: 30px;
        line-height: 1;
        margin-bottom: 20px;
    }
    .admin__card {
        padding: 20px;
    }

    .form-wrapper {
        max-width: 450px;
        margin-top: 50px;
    }
</style>
