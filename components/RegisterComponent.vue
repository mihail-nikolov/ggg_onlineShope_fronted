<template>
    <v-container>
        <v-form>
            <form-component
                elemType="email"
                v-model="email"
                fieldName="Имейл"
                :hasError="validation.hasError('email')"
                :firstError="validation.firstError('email')"
            ></form-component>
            <form-component
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
            <form-component
                elemType="text"
                v-model="fullName"
                fieldName="Име"
                :hasError="validation.hasError('fullName')"
                :firstError="validation.firstError('fullName')"
            ></form-component>
            <form-component
                elemType="text"
                v-model="country"
                fieldName="Държава"
                :hasError="validation.hasError('country')"
                :firstError="validation.firstError('country')"
            ></form-component>
            <form-component
                elemType="text"
                v-model="city"
                fieldName="Град"
                :hasError="validation.hasError('city')"
                :firstError="validation.firstError('city')"
            ></form-component>
            <form-component
                elemType="text"
                v-model="address"
                fieldName="Адрес"
                :hasError="validation.hasError('address')"
                :firstError="validation.firstError('address')"
            ></form-component>
            <form-component
                elemType="text"
                v-model="phone"
                fieldName="Телефон"
                :hasError="validation.hasError('phone')"
                :firstError="validation.firstError('phone')"
            ></form-component>
            <v-flex xs6>
                <v-select
                    label="Legal entity"
                    v-bind:items="entities"
                    v-model="legalEntity"
                    single-line
                    bottom
                    item-value="text"
                ></v-select>
            </v-flex>
            <form-component
                v-if="legalEntity === 'Организация'"
                elemType="text"
                v-model="bulstat"
                fieldName="Булстат"
                :hasError="validation.hasError('bulstat')"
                :firstError="validation.firstError('bulstat')"
            ></form-component>
            <button type="button" class="button buttonBlue" @click="onSubmit">Регистрация
                <div class="ripples buttonRipples" v-bind:class="{ 'is-active': isButtonClicked }">
                    <span class="ripplesCircle" v-bind:style="{ top: circleY, left: circleX }"></span>
                </div>
            </button>
        </v-form>
    </v-container>
</template>

<script>
import SimpleVueValidation from "simple-vue-validator";
import FormInputComponent from "~/components/Form/FormInputComponent";
const Validator = SimpleVueValidation.Validator;
export default {
    name: "RegisterComponent",
    components: {
        "form-component": FormInputComponent
    },
    data() {
        return {
            email: "",
            password: "",
            confirmedPassword: "",
            fullName: "",
            country: "",
            city: "",
            address: "",
            phone: "",
            legalEntity: "",
            entities: ["Юридическо лице", "Организация"],
            bulstat: "",
            isButtonClicked: false,
            circleX: "0px",
            circleY: "0px"
        };
    },
    methods: {
        onSubmit(e) {
            let comp = this;
            if (!comp.isButtonClicked) {
                comp.isButtonClicked = true;
                comp.circleX = e.pageX - (e.pageX - e.offsetX) + "px";
                comp.circleY = e.pageY - (e.pageY - e.offsetY) + "px";
                setTimeout(function() {
                    comp.isButtonClicked = false;
                }, 400);
            }
            comp.$validate().then(function(success) {
                let notification = {};
                if (success) {
                    comp.$store
                        .dispatch("modules/auth/register", {
                            Email: comp.email,
                            Password: comp.password,
                            ConfirmPassword: comp.confirmedPassword,
                            IsCompany:
                                comp.legalEntity === "Юридическо лице"
                                    ? false
                                    : true,
                            Bulstat: comp.bulstat || null,
                            Name: comp.fullName,
                            DeliveryCountry: comp.country,
                            DeliveryTown: comp.city,
                            DeliveryAddress: comp.address,
                            PhoneNumber: comp.phone,
                            PercentageReduction: 0 // TODO: ask misho WTF is that?
                        })
                        .then(() => {
                            comp.$router.push({ path: `/login` });
                        })
                        .catch(err => {
                            const message = err.response.data.Message;
                            comp.$store.dispatch(
                                "modules/general/setSnackbarNotification",
                                {
                                    message: message,
                                    status: "error"
                                }
                            );
                        });
                } else {
                    comp.$store.dispatch(
                        "modules/general/setSnackbarNotification",
                        {
                            message:
                                "Please fill in all the required fields with correct data.",
                            status: "error"
                        }
                    );
                }
            });
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
            if (
                this.isButtonClicked ||
                this.validation.isTouched("confirmedPassword")
            ) {
                return Validator.value(confirmedPassword)
                    .required()
                    .match(password);
            }
        },
        fullName(value) {
            return Validator.value(value).required();
        },
        country(value) {
            return Validator.value(value).required();
        },
        city(value) {
            return Validator.value(value).required();
        },
        address(value) {
            return Validator.value(value).required();
        },
        phone(value) {
            return Validator.value(value)
                .required()
                .regex(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
                );
        },
        legalEntity(value) {
            return Validator.value(value).required();
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
