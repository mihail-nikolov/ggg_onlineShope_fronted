<template>
    <v-container>
        <v-form>
            <form-component
                @onKeyUp="onKeyUp"
                elemType="email"
                v-model="email"
                fieldName="Имейл"
                :hasError="validation.hasError('email')"
                :firstError="validation.firstError('email')"
            ></form-component>
            <form-component @onKeyUp="onKeyUp" v-model="code" fieldName="Код"></form-component>
            <form-component
                @onKeyUp="onKeyUp"
                elemType="password"
                v-model="password"
                fieldName="Парола"
                :hasError="validation.hasError('password')"
                :firstError="validation.firstError('password')"
            ></form-component>

            <form-component
                elemType="password"
                v-model="confirmedPassword"
                fieldName="Потвтори парола"
                :hasError="validation.hasError('confirmedPassword')"
                :firstError="validation.firstError('confirmedPassword')"
            ></form-component>
            <v-layout row wrap>
                <v-flex xs6>
                    <button type="button" class="button buttonBlue" @click="onSubmit">Изпращане</button>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
import SimpleVueValidation from "simple-vue-validator";
import FormInputComponent from "~/components/Form/FormInputComponent";
const Validator = SimpleVueValidation.Validator;
export default {
    name: "ResetPassword",
    components: {
        "form-component": FormInputComponent
    },
    data() {
        return {
            email: "",
            password: "",
            confirmedPassword: "",
            code: ""
        };
    },
    methods: {
        onSubmit(e) {
            let comp = this;

            this.$validate().then(success => {
                if (success) {
                    this.$store
                        .dispatch("modules/auth/resetPassword", {
                            Email: this.email,
                            Code: this.code,
                            Password: this.password,
                            ConfirmPassword: this.confirmedPassword
                        })
                        .then(() => {
                            this.$router.push({ path: `/` });
                        });
                } else {
                    this.$store.dispatch(
                        "modules/general/setSnackbarNotification",
                        {
                            message:
                                "Моля попълнете всички полета и опитайте отново.",
                            status: "error"
                        }
                    );
                    this.email = "";
                }
            });
        },
        onKeyUp(e) {
            if (e.key === "Enter") {
                this.onSubmit();
            }
        }
    },
    validators: {
        email(value) {
            return Validator.value(value)
                .required()
                .email();
        },
        password(value) {
            return Validator.value(value)
                .required()
                .minLength(6);
        },
        "confirmedPassword, password"(confirmedPassword, password) {
            if (this.validation.isTouched("confirmedPassword")) {
                return Validator.value(confirmedPassword)
                    .required()
                    .match(password);
            }
        }
    }
};
</script>

<style lang="css">
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
    color: #37474f;
}

form {
    width: 580px;
    margin: 4em auto;
    padding: 3em 2em 2em 2em;
    background: #fafafa;
    border: 1px solid #ebebeb;
    box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px,
        rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;
}
/* Button */

.button {
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    margin: 0.3em 0 1em 0;
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
    background: #37474f;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
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
    animation: ripples 0.4s ease-in;
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

.errorVal {
    color: #ff5252 !important;
    background-color: transparent !important;
}
</style>
