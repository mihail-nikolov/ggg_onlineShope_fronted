<template>
    <v-container>
        <v-card class="admin__card">
            <h2 class="admin__title">Смени парола</h2>
            <v-form class="form-wrapper">
                <form-component @onKeyUp="onKeyUp" :color="'white'" elemType="password" v-model="password" fieldName="Парола" :hasError="validation.hasError('password')" :firstError="validation.firstError('password')"></form-component>
                <form-component @onKeyUp="onKeyUp" :color="'white'" elemType="password" v-model="newPassword" fieldName="Нова парола" :hasError="validation.hasError('newPassword')" :firstError="validation.firstError('newPassword')"></form-component>
                <form-component @onKeyUp="onKeyUp" :color="'white'" elemType="password" v-model="newPassword2" fieldName="Повтори новата парола" :hasError="validation.hasError('newPassword2')" :firstError="validation.firstError('newPassword2')"></form-component>
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
			password: '',
			newPassword: '',
			newPassword2: ''
		};
	},
	components: {
		'form-component': FormInputComponent
	},
	methods: {
		onSubmit(e) {
			this.$validate()
				.then(success => {
					if (success) {
						this.$store.dispatch("modules/auth/changeUserPassword", {
							OldPassword: this.password,
							NewPassword: this.newPassword,
							ConfirmPassword: this.newPassword2
						});
					}
					else {
						this.$store.dispatch("modules/general/setSnackbarNotification", {
							message: "Грешка при смяна на паролата.",
							status: "error"
						});
						this.password = '';
						this.newPassword = '';
						this.newPassword2 = '';
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
		password(value) {
			return Validator.value(value).required().minLength(6);
		},
		'newPassword, newPassword2': function (newPassword, newPassword2) {
			console.log(newPassword, newPassword2, (this.submitted || this.validation.isTouched('newPassword')));
			if (this.submitted || this.validation.isTouched('newPassword')) {
				return Validator.value(newPassword).required().minLength(6).match(newPassword2);
			}
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
