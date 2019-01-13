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
            <form-component
                @onKeyUp="onKeyUp"
                elemType="password"
                v-model="password"
                fieldName="Парола"
                :hasError="validation.hasError('password')"
                :firstError="validation.firstError('password')"
            ></form-component>
            <v-layout row wrap>
                <v-flex xs6 row wrap>
                    <nuxt-link xs12 to="/register" style="text-decoration: none">
                        <v-btn flat class="btn-fat">Регистрация</v-btn>
                    </nuxt-link>
                </v-flex>
                <v-flex xs6>
                    <button type="button" class="button buttonBlue" @click="onSubmit">Вход
                        <div
                            class="ripples buttonRipples"
                            v-bind:class="{ 'is-active': isButtonClicked }"
                        >
                            <span
                                class="ripplesCircle"
                                v-bind:style="{ top: circleY, left: circleX }"
                            ></span>
                        </div>
                    </button>
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
    name: "LoginComponent",
    components: {
        "form-component": FormInputComponent
    },
    data() {
        return {
            isEmailUsed: false,
            isPasswordUsed: false,
            isButtonClicked: false,
            email: "",
            password: "",
            circleX: "0px",
            circleY: "0px"
        };
    },
    methods: {
        onSubmit(e) {
            if (!this.isButtonClicked && e) {
                this.isButtonClicked = true;
                this.circleX = e.pageX - (e.pageX - e.offsetX) + "px";
                this.circleY = e.pageY - (e.pageY - e.offsetY) + "px";
                setTimeout(function() {
                    this.isButtonClicked = false;
                }, 400);
            }
            this.$validate().then(success => {
                if (success) {
                    this.$store
                        .dispatch("modules/auth/login", {
                            email: this.email,
                            password: this.password
                        })
                        .then(() => {
                            this.$router.push({ path: `/my/profile` });
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
                    this.password = "";
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
            return Validator.value(value).required();
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
    color: #37474f;
}

form {
    width: 580px;
    margin: 4em auto;
    padding: 3em 2em 2em 2em;
    background: #fafafa;
    border: 1px solid #ebebeb;
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.14),
        0 12px 17px 2px rgba(0, 0, 0, 0.08), 0 5px 22px 4px rgba(0, 0, 0, 0.06);
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
    transform: scale(0.75);
    left: -3px;
    /* font-size: 14px; */
    color: #37474f;
}
/* Underline */

.bar {
    position: relative;
    display: block;
    width: 100%;
}

.bar:before,
.bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #37474f;
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
        background: #37474f;
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

.btn-fat {
    margin: 5px 0;
}

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
</style>
